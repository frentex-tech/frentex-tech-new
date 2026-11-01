import type { IntroContent } from "@/content/localized";
import { MutedSecondLine } from "./MutedSecondLine";

/** The page's headline plate, shared by every inner page. */
export function PageIntro({ intro }: { intro: IntroContent }) {
  return (
    <section className="page-intro wrap">
      <div className="ambient-field" aria-hidden="true" />
      <div className="eyebrow">{intro.eyebrow}</div>
      <h1>{typeof intro.title === "string" ? intro.title : <MutedSecondLine lines={intro.title} />}</h1>
      <p>{intro.lead}</p>
    </section>
  );
}
