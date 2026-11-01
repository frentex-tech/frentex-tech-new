import { readFile } from "node:fs/promises";
import type { Page } from "@playwright/test";
import { expect, openPage, test } from "./support/fixtures";

/** Moves the pointer away so hover styles never leak into a screenshot. */
const park = (page: Page) => page.mouse.move(0, 0);

const onlyOn = (projects: string[], reason: string) =>
  test.beforeEach(() => test.skip(!projects.includes(test.info().project.name), reason));

test.describe("navigation menu (narrow screens)", () => {
  onlyOn(["mobile-390"], "the menu button is only shown at 900px and below");

  test("opens and closes with the menu button", async ({ page }) => {
    await openPage(page, "/");
    const toggle = page.locator(".menu-toggle");
    const menu = page.locator("#navigation");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toHaveAttribute("aria-label", "فتح القائمة");
    await expect(menu).toBeHidden();

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(toggle).toHaveAttribute("aria-label", "إغلاق القائمة");
    await expect(menu).toHaveClass("open");
    // The language link, when the page has a translation, is checked in localization.spec.ts.
    await expect(menu.locator("a:not(.language-switch)")).toHaveText(["الرئيسية", "حلولنا", "مختبر الأعمال", "عن فرينتكس", "كيف نعمل", "ناقش احتياج شركتك"]);
    await park(page);
    await expect(page).toHaveScreenshot("menu-open.png");

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toHaveAttribute("aria-label", "فتح القائمة");
    await expect(menu).toBeHidden();
  });

  test("closes with Escape and keeps focus on the menu button", async ({ page }) => {
    await openPage(page, "/");
    const toggle = page.locator(".menu-toggle");
    await toggle.click();
    await expect(page.locator("#navigation")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("#navigation")).toBeHidden();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
  });

  test("closes after following a link", async ({ page }) => {
    await openPage(page, "/");
    await page.locator(".menu-toggle").click();
    await page.locator("#navigation").getByRole("link", { name: "مختبر الأعمال" }).click();
    await expect(page).toHaveURL(/\/work$/);
    await expect(page.locator(".menu-toggle")).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator("#navigation")).toBeHidden();
  });
});

test.describe("navigation (wide screens)", () => {
  onlyOn(["desktop-1440", "tablet-1024"], "the inline navigation is shown above 900px");

  test("header, footer and call-to-action links reach their pages", async ({ page }) => {
    await openPage(page, "/");
    await expect(page.locator(".menu-toggle")).toBeHidden();
    await expect(page.locator("#navigation")).toBeVisible();

    const cases: [string, string, RegExp][] = [
      ["#navigation >> text=حلولنا", "حلول الشركات والمؤسسات | Frentex Tech", /\/services$/],
      ["#navigation >> text=كيف نعمل", "طريقة العمل | Frentex Tech", /\/process$/],
      [".nav-cta", "تواصل معنا | Frentex Tech", /\/contact$/],
      [".red-footer >> text=الخصوصية", "خصوصية الموقع | Frentex Tech", /\/privacy$/],
      [".site-header .brand", "فرينتكس | برمجيات تربط أعمالك", /\/$/],
    ];
    for (const [selector, title, url] of cases) {
      await page.locator(selector).click();
      await expect(page).toHaveURL(url);
      await expect(page).toHaveTitle(title);
    }
  });
});

test.describe("keyboard focus", () => {
  test("the skip link is the first stop and moves focus into the page", async ({ page }) => {
    await openPage(page, "/about");
    await page.keyboard.press("Tab");
    const skip = page.locator(".skip");
    await expect(skip).toBeFocused();
    await expect(skip).toHaveCSS("top", "10px");
    await expect(page).toHaveScreenshot("skip-link-focused.png");

    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
    await page.keyboard.press("Tab");
    await expect(page.locator("main :focus")).toHaveCount(1);
  });

  test("focused controls show the focus outline", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "mobile-390", "the .nav-cta button is hidden below 720px");
    await openPage(page, "/");
    const cta = page.locator(".nav-cta");
    for (let i = 0; i < 12 && !(await cta.evaluate((el) => el === document.activeElement)); i++) {
      await page.keyboard.press("Tab");
    }
    await expect(cta).toBeFocused();
    await expect(cta).toHaveCSS("outline", "rgb(52, 127, 204) solid 3px");
    await expect(cta).toHaveCSS("outline-offset", "5px");
    await expect(page.locator(".site-header")).toHaveScreenshot("focus-outline.png");
  });
});

test.describe("project brief dialog", () => {
  const challenge = "  متابعة طلبات العملاء تتم بين رسائل وجداول  ";
  const users = " فريق المبيعات ";

  test("opens and blocks incomplete answers", async ({ page }) => {
    await openPage(page, "/contact");
    const dialog = page.locator("#brief-dialog");
    const submit = page.locator('#brief-form [type="submit"]');
    const challengeField = page.locator('textarea[name="challenge"]');
    const usersField = page.locator('input[name="users"]');
    await expect(dialog).toBeHidden();

    await page.locator("[data-open-brief]").click();
    await expect(dialog).toBeVisible();
    await expect(page.locator(".dialog-close")).toBeFocused();
    await park(page);
    await expect(page).toHaveScreenshot("brief-dialog-open.png");

    await submit.click();
    await expect(challengeField).toBeFocused();
    expect(await challengeField.evaluate((el: HTMLTextAreaElement) => el.validity.valueMissing)).toBe(true);

    await challengeField.fill("قصير");
    await submit.click();
    expect(await challengeField.evaluate((el: HTMLTextAreaElement) => el.validity.tooShort)).toBe(true);

    await challengeField.fill(challenge);
    await submit.click();
    await expect(usersField).toBeFocused();
    expect(await usersField.evaluate((el: HTMLInputElement) => el.validity.valueMissing)).toBe(true);
    await expect(page.locator("#brief-result")).toBeHidden();
  });

  test("prepares, downloads and edits the summary", async ({ page }) => {
    await openPage(page, "/contact");
    await page.locator("[data-open-brief]").click();
    await page.locator('select[name="service"]').selectOption({ index: 2 });
    await page.locator('textarea[name="challenge"]').fill(challenge);
    await page.locator('input[name="users"]').fill(users);
    await page.locator('#brief-form [type="submit"]').click();

    await expect(page.locator("#brief-form")).toBeHidden();
    await expect(page.locator("#brief-result")).toBeVisible();
    await expect(page.locator("#download-brief")).toBeFocused();
    const briefText = await page.locator("#brief-text").textContent();
    expect(briefText).toMatchSnapshot("brief-summary.txt");
    await park(page);
    await expect(page.locator("#brief-dialog")).toHaveScreenshot("brief-dialog-result.png");

    const [download] = await Promise.all([page.waitForEvent("download"), page.locator("#download-brief").click()]);
    expect(download.suggestedFilename()).toBe("frentex-project-brief.txt");
    expect(await readFile(await download.path(), "utf8")).toBe(`﻿${briefText}`);
    await expect(page.locator("#brief-status")).toHaveText("بدأ تنزيل الملخص على جهازك. لم تُرسل أي بيانات.");

    await page.locator("#edit-brief").click();
    await expect(page.locator("#brief-form")).toBeVisible();
    await expect(page.locator("#brief-result")).toBeHidden();
    await expect(page.locator('select[name="service"]')).toBeFocused();
    await expect(page.locator('select[name="service"]')).toHaveValue("نظام ERP أو CRM");
    await expect(page.locator('textarea[name="challenge"]')).toHaveValue(challenge);
  });

  test("closes with the close button, the backdrop and Escape", async ({ page }) => {
    await openPage(page, "/contact");
    const trigger = page.locator("[data-open-brief]");
    const dialog = page.locator("#brief-dialog");

    await trigger.click();
    await page.locator(".dialog-close").click();
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();

    await trigger.click();
    await page.mouse.click(5, 5);
    await expect(dialog).toBeHidden();

    await trigger.click();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("the home page keeps the original closed dialog without a trigger", async ({ page }) => {
    await openPage(page, "/");
    await expect(page.locator("#brief-dialog")).toHaveCount(1);
    await expect(page.locator("#brief-dialog")).toBeHidden();
    await expect(page.locator("[data-open-brief]")).toHaveCount(0);
  });
});

test.describe("Work Lab filters", () => {
  const cases = [
    { filter: "crm", visible: ["crm"], status: "نموذج تفاعلي واحد" },
    { filter: "erp", visible: ["erp"], status: "نموذج تفاعلي واحد" },
    { filter: "ops", visible: ["ops"], status: "نموذج تفاعلي واحد" },
    { filter: "all", visible: ["crm", "ops", "erp"], status: "٣ نماذج تفاعلية" },
  ];

  for (const path of ["/work"]) {
    test(`filter buttons, cards and status text on ${path}`, async ({ page }) => {
      await openPage(page, path);
      await expect(page.locator("#filter-status")).toHaveText("٣ نماذج تفاعلية");
      for (const { filter, visible, status } of cases) {
        await page.locator(`[data-filter="${filter}"]`).click();
        for (const button of await page.locator("[data-filter]").all()) {
          const pressed = (await button.getAttribute("data-filter")) === filter;
          await expect(button).toHaveAttribute("aria-pressed", String(pressed));
          await expect(button).toHaveClass(pressed ? "filter active" : "filter");
        }
        for (const category of ["crm", "ops", "erp"]) {
          const card = page.locator(`[data-category="${category}"]`);
          if (visible.includes(category)) await expect(card).toBeVisible();
          else await expect(card).toBeHidden();
        }
        await expect(page.locator("#filter-status")).toHaveText(status);
        if (filter === "ops") {
          await park(page);
          await expect(page.locator("#work")).toHaveScreenshot("work-lab-filtered.png");
        }
      }
    });
  }
});

test.describe("sector tabs", () => {
  test("tabs switch panels on click and with arrow keys in RTL and LTR", async ({ page }) => {
    // Arabic home (RTL)
    await openPage(page, "/");
    const tabs = page.locator('.sector-tabs [role="tab"]');
    await expect(tabs).toHaveCount(3);
    await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "false");
    await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "false");

    await tabs.nth(1).click();
    await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "false");
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("#sector-panel")).toHaveAttribute("aria-labelledby", "tab-ops");

    // Keyboard navigation in RTL: ArrowLeft advances forward
    await tabs.nth(1).focus();
    await page.keyboard.press("ArrowLeft");
    await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("#sector-panel")).toHaveAttribute("aria-labelledby", "tab-erp");

    await page.keyboard.press("ArrowRight");
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");

    // English home (LTR)
    await openPage(page, "/en");
    const enTabs = page.locator('.sector-tabs [role="tab"]');
    await expect(enTabs.nth(0)).toHaveAttribute("aria-selected", "true");
    await enTabs.nth(0).focus();
    // Keyboard navigation in LTR: ArrowRight advances forward
    await page.keyboard.press("ArrowRight");
    await expect(enTabs.nth(1)).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("#sector-panel")).toHaveAttribute("aria-labelledby", "tab-ops");

    await page.keyboard.press("ArrowLeft");
    await expect(enTabs.nth(0)).toHaveAttribute("aria-selected", "true");
  });
});

test.describe("FAQ accordion", () => {
  test("FAQ details open and close on summary click", async ({ page }) => {
    await openPage(page, "/");
    const items = page.locator(".studio-faq details");
    await expect(items).toHaveCount(4);

    // First item open by default
    await expect(items.nth(0)).toHaveAttribute("open", "");
    await expect(items.nth(1)).not.toHaveAttribute("open", "");

    // Click second item
    await items.nth(1).locator("summary").click();
    await expect(items.nth(1)).toHaveAttribute("open", "");

    // Click first item to close
    await items.nth(0).locator("summary").click();
    await expect(items.nth(0)).not.toHaveAttribute("open", "");
  });
});

test.describe("narrow viewport overflow (320px)", () => {
  test("no horizontal overflow at 320px width", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 600 });
    for (const path of ["/", "/en", "/services", "/work", "/about", "/process", "/contact", "/privacy"]) {
      await openPage(page, path);
      const widths = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
      }));
      expect(widths.scroll, `${path} overflows at 320px: scroll ${widths.scroll} vs client ${widths.client}`).toBe(widths.client);
    }
  });
});

test.describe("CRM demo (Madar)", () => {
  test("search, move leads with mouse and keyboard, and reset", async ({ page }) => {
    await openPage(page, "/project?project=crm");
    const status = page.locator("#demo-status");

    await page.locator("#lead-search").fill(" بوابة ");
    await expect(status).toHaveText("عدد الفرص المطابقة: 1");
    await expect(page.locator(".lead-card")).toHaveText([/بوابة شركاء/]);

    await page.locator("#lead-search").fill("غير موجود");
    await expect(status).toHaveText("عدد الفرص المطابقة: 0");
    await expect(page.locator(".empty-state")).toHaveCount(3);
    await page.locator("#lead-search").fill("");

    await page.locator('[data-lead="1"][data-direction="1"]').click();
    await expect(status).toHaveText("نُقلت «موقع شركة خدمات» إلى «عرض مرسل». الإجراء تجريبي محلي.");
    await expect(page.locator('[data-lead="1"]').first()).toBeFocused();
    await page.locator('[data-lead="1"][data-direction="1"]').click();
    await expect(status).toHaveText("نُقلت «موقع شركة خدمات» إلى «تم الاتفاق». الإجراء تجريبي محلي.");
    await expect(page.locator(".kanban-column h3 span")).toHaveText(["1", "1", "2"]);

    await page.locator('[data-lead="4"][data-direction="-1"]').click();
    await expect(status).toHaveText("نُقلت «نظام تشغيل داخلي» إلى «عرض مرسل». الإجراء تجريبي محلي.");

    await page.locator('[data-lead="2"][data-direction="1"]').focus();
    await page.keyboard.press("Enter");
    await expect(status).toHaveText("نُقلت «بوابة شركاء» إلى «عرض مرسل». الإجراء تجريبي محلي.");
    await expect(page.locator('[data-lead="2"]').first()).toBeFocused();
    await expect(page.locator(".kanban-column h3 span")).toHaveText(["0", "3", "1"]);
    await park(page);
    await expect(page.locator(".demo-shell")).toHaveScreenshot("crm-after-moves.png");

    await page.locator("#reset-crm").click();
    await expect(status).toHaveText("أُعيد النموذج إلى الحالة الأصلية.");
    await expect(page.locator(".kanban-column h3 span")).toHaveText(["2", "1", "1"]);
  });
});

test.describe("operations demo (Sayr)", () => {
  test("select, approve, reopen, return and reset requests", async ({ page }) => {
    await openPage(page, "/project?project=ops");
    const status = page.locator("#demo-status");
    const detail = page.locator("#request-detail");

    await page.locator('[data-request="15"]').click();
    await expect(status).toHaveText("عرض تفاصيل الطلب رقم 15");
    await expect(page.locator('[data-request="15"]')).toBeFocused();
    await expect(page.locator('[data-request="15"]')).toHaveAttribute("aria-pressed", "true");
    await expect(detail.locator("h3")).toHaveText("مراجعة بيانات مورد");

    await detail.locator('[data-action="approve"]').click();
    await expect(status).toHaveText("تم الاعتماد تجريبيًا — الطلب رقم 15");
    await expect(detail.locator('[data-action="reopen"]')).toBeFocused();
    await expect(detail.locator('[data-action="approve"]')).toBeDisabled();
    await expect(detail.locator(".activity-list li")).toHaveText([
      "تم إنشاء طلب مراجعة المورد.",
      "اعتماد محلي تجريبي؛ لم تُنفذ صلاحيات أو إجراءات خارجية.",
    ]);
    await park(page);
    await expect(page.locator(".demo-shell")).toHaveScreenshot("ops-after-approve.png");

    await detail.locator('[data-action="reopen"]').click();
    await expect(status).toHaveText("بانتظار المراجعة — الطلب رقم 15");
    await expect(detail.locator('[data-action="approve"]')).toBeFocused();

    await detail.locator('[data-action="return"]').click();
    await expect(status).toHaveText("أُعيد للاستكمال — الطلب رقم 15");
    await expect(page.locator('[data-request="15"] small')).toHaveText("#15 · أُعيد للاستكمال");

    await page.locator("#reset-ops").click();
    await expect(status).toHaveText("أُعيدت الطلبات إلى حالة انتظار المراجعة.");
    await expect(page.locator('[data-request="14"]')).toHaveAttribute("aria-pressed", "true");
    await expect(detail.locator(".activity-list li")).toHaveText(["تم استلام الطلب للمراجعة."]);
  });
});

test.describe("inventory demo (Raseed)", () => {
  test("validate quantities, raise and receive a purchase order, and reset", async ({ page }) => {
    await openPage(page, "/project?project=erp");
    const status = page.locator("#demo-status");
    const quantity = (id: number) => page.locator(`#qty-${id}`);

    await quantity(1).fill("0");
    await page.locator('[data-buy="1"]').click();
    await expect(status).toHaveText("أدخل كمية صحيحة من 1 إلى 1000. لم يُنشأ طلب.");
    await expect(quantity(1)).toBeFocused();
    expect(await quantity(1).evaluate((el: HTMLInputElement) => el.validity.rangeUnderflow)).toBe(true);

    await quantity(1).fill("2.5");
    await page.locator('[data-buy="1"]').click();
    expect(await quantity(1).evaluate((el: HTMLInputElement) => el.validity.stepMismatch)).toBe(true);
    await expect(page.locator(".purchase-item")).toHaveCount(0);

    await quantity(3).fill("7");
    await page.locator('[data-buy="3"]').click();
    await expect(status).toHaveText("أُنشئ طلب شراء تجريبي. المخزون لا يتغير حتى الاستلام.");
    await expect(page.locator(".purchase-item span").first()).toHaveText("#001 · قاعدة توصيل · 7 وحدة");
    await expect(page.locator('[data-receive="1"]')).toBeFocused();
    await expect(page.locator('[data-buy="3"]')).toHaveText("طلب مفتوح");
    await expect(page.locator('[data-buy="3"]')).toBeDisabled();
    // Like the original, every completed action resets the quantity fields.
    for (const id of [1, 2, 3]) await expect(quantity(id)).toHaveValue("5");
    await park(page);
    await expect(page.locator(".demo-shell")).toHaveScreenshot("erp-after-purchase.png");

    await page.locator('[data-receive="1"]').click();
    await expect(status).toHaveText("تمت محاكاة استلام 7 وحدة من قاعدة توصيل. الرصيد الحالي: 10.");
    await expect(page.locator('[data-buy="3"]')).toBeFocused();
    await expect(page.locator(".demo-table tbody tr").nth(2).locator("td").nth(1)).toHaveText("10");
    await expect(page.locator(".demo-table tbody tr").nth(2).locator(".stock-tag")).toHaveText("متوفر");

    await page.locator("#reset-erp").click();
    await expect(status).toHaveText("أُعيد المخزون والطلبات إلى الحالة الأصلية.");
    await expect(page.locator("#reset-erp")).toBeFocused();
    await expect(page.locator(".purchase-list .empty-state")).toHaveText("لا توجد طلبات شراء. ابدأ بصنف من الجدول.");
  });
});

test.describe("demo page navigation", () => {
  test("the next-demo link opens the next demo at the top with its own title", async ({ page }) => {
    await openPage(page, "/project?project=crm");
    await page.locator("#reset-crm").click();
    await page.locator(".next-project a").click();
    await expect(page).toHaveURL(/\/project\?project=ops$/);
    await expect(page).toHaveTitle("سير — نموذج تفاعلي | فرينتكس");
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await expect(page.locator("#demo-status")).toHaveText("");
  });

  test("the back link returns to the lab section of the home page", async ({ page }) => {
    await openPage(page, "/project?project=erp");
    await page.locator(".back-link").click();
    await expect(page).toHaveURL(/\/#work$/);
    await expect(page).toHaveTitle("فرينتكس | برمجيات تربط أعمالك");
    await expect(page.locator("#work")).toBeInViewport();
  });
});
