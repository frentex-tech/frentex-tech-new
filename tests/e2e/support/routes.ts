import { existsSync, readdirSync } from "node:fs";

/**
 * Every page the site exports, with the document title it must have.
 * integrity.spec.ts fails when an exported page is missing from this list,
 * so new routes are always covered by the visual and structure checks.
 */
export type RouteCase = {
  /** Stable name used for snapshot file names. */
  name: string;
  path: string;
  /** The equivalent URL of the original static site, which must keep working. */
  legacyPath?: string;
  title: string;
  /** HTTP status of the document. */
  status?: number;
  /** Whether the full-page screenshot adds coverage beyond another route. */
  screenshot?: boolean;
};

export const routes: RouteCase[] = [
  { name: "home", path: "/", legacyPath: "/index.html", title: "فرينتكس | برمجيات تربط أعمالك" },
  { name: "services", path: "/services", legacyPath: "/services.html", title: "حلول الشركات والمؤسسات | Frentex Tech" },
  { name: "work", path: "/work", legacyPath: "/work.html", title: "مختبر الحلول | Frentex Tech" },
  { name: "process", path: "/process", legacyPath: "/process.html", title: "طريقة العمل | Frentex Tech" },
  { name: "about", path: "/about", legacyPath: "/about.html", title: "عن الشركة | Frentex Tech" },
  { name: "contact", path: "/contact", legacyPath: "/contact.html", title: "تواصل معنا | Frentex Tech" },
  { name: "privacy", path: "/privacy", legacyPath: "/privacy.html", title: "خصوصية الموقع | Frentex Tech" },
  {
    name: "presentation",
    path: "/presentation",
    legacyPath: "/presentation.html",
    title: "المراجع وفكرة التصميم | Frentex Tech",
  },
  {
    name: "solution-platforms",
    path: "/solution-platforms",
    legacyPath: "/solution-platforms.html",
    title: "المواقع وبوابات الأعمال | Frentex Tech",
  },
  {
    name: "solution-apps",
    path: "/solution-apps",
    legacyPath: "/solution-apps.html",
    title: "تطبيقات الجوال | Frentex Tech",
  },
  {
    name: "solution-business",
    path: "/solution-business",
    legacyPath: "/solution-business.html",
    title: "أنظمة CRM وERP | Frentex Tech",
  },
  {
    name: "solution-integration",
    path: "/solution-integration",
    legacyPath: "/solution-integration.html",
    title: "التكاملات والأنظمة المخصصة | Frentex Tech",
  },
  {
    name: "solution-automation",
    path: "/solution-automation",
    legacyPath: "/solution-automation.html",
    title: "الأتمتة والذكاء الاصطناعي | Frentex Tech",
  },
  {
    name: "solution-support",
    path: "/solution-support",
    legacyPath: "/solution-support.html",
    title: "التطوير المستمر والدعم | Frentex Tech",
  },
  {
    name: "project-crm",
    path: "/project?project=crm",
    legacyPath: "/project.html?project=crm",
    title: "مدار — نموذج تفاعلي | فرينتكس",
  },
  {
    name: "project-ops",
    path: "/project?project=ops",
    legacyPath: "/project.html?project=ops",
    title: "سير — نموذج تفاعلي | فرينتكس",
  },
  {
    name: "project-erp",
    path: "/project?project=erp",
    legacyPath: "/project.html?project=erp",
    title: "رصيد — نموذج تفاعلي | فرينتكس",
  },
  // Without ?project= the CRM demo opens; it renders exactly like project-crm.
  {
    name: "project-default",
    path: "/project",
    legacyPath: "/project.html",
    title: "مدار — نموذج تفاعلي | فرينتكس",
    screenshot: false,
  },
  { name: "project-unknown", path: "/project?project=unknown", title: "مختبر الأعمال | فرينتكس" },
  // English pages, added as their approved copy is published.
  { name: "en-home", path: "/en", title: "Frentex Tech | Systems, Not Just Sites" },
  { name: "en-contact", path: "/en/contact", title: "Contact | Frentex Tech" },
  { name: "en-services", path: "/en/services", title: "Business Solutions | Frentex Tech" },
  {
    name: "en-solution-platforms",
    path: "/en/solution-platforms",
    title: "Websites & digital platforms | Frentex Tech",
  },
  { name: "en-solution-apps", path: "/en/solution-apps", title: "Mobile apps | Frentex Tech" },
  { name: "en-solution-business", path: "/en/solution-business", title: "ERP & CRM systems | Frentex Tech" },
  {
    name: "en-solution-integration",
    path: "/en/solution-integration",
    title: "Integrations & custom systems | Frentex Tech",
  },
  { name: "en-solution-automation", path: "/en/solution-automation", title: "Automation & AI | Frentex Tech" },
  {
    name: "en-solution-support",
    path: "/en/solution-support",
    title: "Support & ongoing development | Frentex Tech",
  },
  { name: "en-work", path: "/en/work", title: "Work Lab | Frentex Tech" },
  { name: "en-process", path: "/en/process", title: "How We Work | Frentex Tech" },
  { name: "en-about", path: "/en/about", title: "About Us | Frentex Tech" },
  { name: "en-privacy", path: "/en/privacy", title: "Website Privacy | Frentex Tech" },
  { name: "en-presentation", path: "/en/presentation", title: "References and Design Rationale | Frentex Tech" },
  { name: "en-project-crm", path: "/en/project?project=crm", title: "Madar — Interactive demo | Frentex Tech" },
  { name: "en-project-ops", path: "/en/project?project=ops", title: "Sayr — Interactive demo | Frentex Tech" },
  { name: "en-project-erp", path: "/en/project?project=erp", title: "Raseed — Interactive demo | Frentex Tech" },
  // Without ?project= the CRM demo opens; it renders exactly like en-project-crm.
  {
    name: "en-project-default",
    path: "/en/project",
    title: "Madar — Interactive demo | Frentex Tech",
    screenshot: false,
  },
  { name: "en-project-unknown", path: "/en/project?project=unknown", title: "Work Lab | Frentex Tech" },
  { name: "not-found", path: "/this-page-does-not-exist", title: "الصفحة غير موجودة | Frentex Tech", status: 404 },
];

/** URLs of the exported English pages (`/en`, `/en/about`, ...), read from the build output. */
export function exportedEnglishPaths(): string[] {
  const paths = existsSync("out/en.html") ? ["/en"] : [];
  if (existsSync("out/en")) {
    for (const file of readdirSync("out/en", { recursive: true, encoding: "utf8" })) {
      if (file.endsWith(".html")) paths.push(`/en/${file.replace(/\\/g, "/").replace(/\.html$/, "")}`);
    }
  }
  return paths.sort();
}

/**
 * Browser problems a route legitimately produces. The not-found page is served
 * with status 404, which Chrome also reports as a console error.
 */
export function expectedProblems(routeCase: RouteCase): { patterns: RegExp[] } {
  if (routeCase.status !== 404) return { patterns: [] };
  return {
    patterns: [
      new RegExp(`^HTTP 404: https?://[^/]+${routeCase.path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`),
      /^console\.error: Failed to load resource: the server responded with a status of 404 \(Not Found\)$/,
    ],
  };
}

/** Routes whose head metadata and computed styles are snapshotted. */
export const styleRoutes = ["home", "about", "contact", "process", "solution-apps", "project-crm", "project-ops", "project-erp"];

export function route(name: string): RouteCase {
  const found = routes.find((item) => item.name === name);
  if (!found) throw new Error(`Unknown route "${name}"`);
  return found;
}
