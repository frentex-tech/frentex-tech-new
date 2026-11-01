import ar from "./ar/solutions";
import enCards from "./en/solution-cards";
import en from "./en/solutions";
import type { Localized } from "./localized";

export type SolutionSlug = "platforms" | "apps" | "business" | "integration" | "automation" | "support";

export type Solution = {
  slug: SolutionSlug;
  /** Short English label shown above the title. */
  label: string;
  title: string;
  tagline: string;
  /** What we can build; also the page description and the services card text. */
  summary: string;
  whenItFits: string;
  deliverables: string;
  agreeFirst: string;
};

export type SolutionsContent = {
  documentTitle: (solutionTitle: string) => string;
  eyebrow: (label: string) => string;
  cardTitles: { whenItFits: string; summary: string; deliverables: string; agreeFirst: string };
  purchase: { title: string; body: string; link: string };
  /** Solutions in the order the services page lists them. */
  items: Solution[];
};

export const solutionsContent: Localized<SolutionsContent> = { ar, en };

/** What the services page shows of a solution: its card. */
export type SolutionCard = Pick<Solution, "slug" | "label" | "title" | "summary"> & { tags: string };

const arTags: Record<SolutionSlug, string> = {
  platforms: "تجربة المستخدم · تصميم الواجهات · تطوير الويب",
  apps: "iOS و Android · تطبيقات خدمية · تطبيقات أعمال",
  business: "إدارة العملاء · العمليات · الموارد · التقارير",
  integration: "API · البوابات الداخلية · لوحات التحكم",
  automation: "أتمتة الإجراءات · معالجة المستندات · مساعدات محددة المهام",
  support: "صيانة · تحسين الأداء · تطوير الخصائص",
};

/**
 * The services page cards, a section of their own so the services page can be
 * published in a language before the solution pages. The Arabic cards are taken
 * from the Arabic solutions, so their text is written once.
 */
export const solutionCardsContent: Localized<SolutionCard[]> = {
  ar: ar.items.map(({ slug, label, title, summary }) => ({
    slug,
    label,
    title,
    summary,
    tags: arTags[slug],
  })),
  en: enCards,
};

export function getSolution(content: SolutionsContent, slug: SolutionSlug): Solution {
  const solution = content.items.find((item) => item.slug === slug);
  if (!solution) throw new Error(`Unknown solution "${slug}".`);
  return solution;
}
