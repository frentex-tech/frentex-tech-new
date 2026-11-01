import type { Page } from "@playwright/test";

/**
 * Serialises the rendered <body> as an indented outline of elements, their
 * attributes and their text. React's comment markers and Next.js runtime
 * elements are ignored, adjacent text nodes are merged, and whitespace between
 * two inline elements is recorded because it is visible.
 */
export function domSignature(page: Page): Promise<string> {
  return page.evaluate(() => {
    const ignoredTags = new Set(["SCRIPT", "STYLE", "LINK", "TEMPLATE", "NEXT-ROUTE-ANNOUNCER"]);
    const isNextOutlet = (el: Element) =>
      el.parentElement === document.body && el.tagName === "DIV" && el.hasAttribute("hidden") && !el.children.length;
    const isInline = (node: Node | undefined) =>
      node instanceof Element && getComputedStyle(node).display.startsWith("inline");
    const lines: string[] = [];

    const walk = (parent: Node, depth: number) => {
      const indent = "  ".repeat(depth);
      const children = [...parent.childNodes].filter(
        (node) => node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE,
      );
      for (let i = 0; i < children.length; i++) {
        const node = children[i];
        if (node.nodeType === Node.TEXT_NODE) {
          if (i > 0 && children[i - 1].nodeType === Node.TEXT_NODE) continue;
          let text = "";
          let next = i;
          for (; next < children.length && children[next].nodeType === Node.TEXT_NODE; next++) {
            text += children[next].textContent;
          }
          if (text.trim()) lines.push(`${indent}"${text.replace(/\s+/g, " ")}"`);
          else if (isInline(children[i - 1]) && isInline(children[next])) lines.push(`${indent}(space)`);
          continue;
        }
        const element = node as Element;
        if (ignoredTags.has(element.tagName) || isNextOutlet(element)) continue;
        const attributes = [...element.attributes]
          .filter((attribute) => !(attribute.name === "class" && !attribute.value.trim()))
          .map((attribute) => {
            let value = attribute.value;
            if (attribute.name === "class") value = value.trim().split(/\s+/).sort().join(" ");
            if (attribute.name === "href" || attribute.name === "src") {
              const url = new URL(value, location.href);
              if (url.origin === location.origin) value = url.pathname + url.search + url.hash;
            }
            return `${attribute.name}="${value}"`;
          })
          .sort();
        lines.push(`${indent}<${element.tagName.toLowerCase()}${attributes.length ? ` ${attributes.join(" ")}` : ""}>`);
        // With JavaScript enabled, <noscript> content is inert text.
        if (element.tagName !== "NOSCRIPT") walk(element, depth + 1);
      }
    };

    walk(document.body, 0);
    return lines.join("\n") + "\n";
  });
}

/** Document-level metadata: language, direction, title and head tags (hashed asset links excluded). */
export function headMetadata(page: Page): Promise<string> {
  return page.evaluate(() => {
    const html = document.documentElement;
    const meta = [...document.head.querySelectorAll("meta")]
      .filter((tag) => !tag.hasAttribute("charset"))
      .map((tag) => {
        const key = tag.getAttribute("name") ?? tag.getAttribute("property") ?? tag.getAttribute("http-equiv");
        return `meta ${key} = ${tag.getAttribute("content")}`;
      });
    const links = [...document.head.querySelectorAll("link")]
      .filter((tag) => ["canonical", "icon", "alternate", "manifest"].includes(tag.rel))
      .map((tag) => `link ${tag.rel}${tag.hreflang ? ` (${tag.hreflang})` : ""} = ${tag.getAttribute("href")}`);
    return (
      [
        `html lang = ${html.lang}`,
        `html dir = ${html.dir}`,
        `html data-scroll-behavior = ${html.dataset.scrollBehavior}`,
        `title = ${document.title}`,
        ...meta.sort(),
        ...links.sort(),
      ].join("\n") + "\n"
    );
  });
}

/** Elements whose computed styles carry the site's visual identity. Missing ones are skipped. */
const criticalElements: { selector: string; pseudo?: string }[] = [
  { selector: "html" },
  { selector: "body" },
  { selector: ".skip" },
  { selector: ".site-header" },
  { selector: ".nav-shell" },
  { selector: ".site-header .brand" },
  { selector: ".site-header .brand small" },
  { selector: "#navigation" },
  { selector: "#navigation a" },
  { selector: ".nav-cta" },
  { selector: ".menu-toggle" },
  { selector: "main .wrap" },
  { selector: "main h1" },
  { selector: "main h2" },
  { selector: "main .eyebrow" },
  { selector: "main .muted" },
  { selector: "main p" },
  { selector: ".button.primary" },
  { selector: ".button.secondary" },
  { selector: ".text-link" },
  { selector: ".red-footer" },
  { selector: ".red-footer p" },
  // Home page
  { selector: ".studio-hero" },
  { selector: ".hero-center h1" },
  { selector: ".feature-service" },
  { selector: ".studio-sectors" },
  { selector: ".work-section" },
  { selector: ".filter" },
  { selector: ".filter.active" },
  { selector: ".work-visual" },
  { selector: ".product-window" },
  { selector: ".studio-about" },
  { selector: ".studio-process" },
  { selector: ".studio-faq" },
  { selector: ".studio-cta" },
  // Inner pages
  { selector: ".page-intro" },
  { selector: ".enterprise-card" },
  { selector: ".enterprise-cta" },
  { selector: ".card-grid" },
  { selector: ".detail-grid" },
  { selector: ".phone-link" },
  // Demo pages
  { selector: ".project-heading h1" },
  { selector: ".case-facts" },
  { selector: ".demo-section" },
  { selector: ".demo-shell" },
  { selector: ".small-button" },
  { selector: ".small-button.filled" },
  { selector: ".kanban-column" },
  { selector: ".lead-card" },
  { selector: ".request-select.selected" },
  { selector: ".demo-table th" },
  { selector: ".stock-tag.low" },
  { selector: ".demo-status" },
];

const styleProperties = [
  "display",
  "position",
  "top",
  "direction",
  "text-align",
  "font-family",
  "font-size",
  "font-weight",
  "line-height",
  "letter-spacing",
  "color",
  "background-color",
  "background-image",
  "border-top",
  "border-right",
  "border-bottom",
  "border-left",
  "border-radius",
  "padding",
  "margin",
  "gap",
  "grid-template-columns",
  "max-width",
  "min-height",
  "box-shadow",
  // Chrome resolves the -webkit- alias into this property, so it is not listed separately.
  "backdrop-filter",
  "transform",
  "opacity",
  "transition-duration",
  "scroll-behavior",
  "outline",
];

/** Computed styles of the critical elements present on the current page, as stable JSON. */
export function criticalStyles(page: Page): Promise<string> {
  return page.evaluate(
    ({ elements, properties }) => {
      const result: Record<string, Record<string, string>> = {};
      for (const { selector, pseudo } of elements) {
        const element = document.querySelector(selector);
        if (!element) continue;
        const style = getComputedStyle(element, pseudo ?? null);
        result[selector + (pseudo ?? "")] = Object.fromEntries(
          properties.map((property) => [property, style.getPropertyValue(property)]),
        );
      }
      return JSON.stringify(result, null, 2) + "\n";
    },
    { elements: criticalElements, properties: styleProperties },
  );
}
