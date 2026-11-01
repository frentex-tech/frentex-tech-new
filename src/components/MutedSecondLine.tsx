import type { TwoLines } from "@/content/localized";

/** A heading on two lines with a muted second line, as used by section and page titles. */
export function MutedSecondLine({ lines: [first, second] }: { lines: TwoLines }) {
  return (
    <>
      {first}
      <br />
      <span className="muted">{second}</span>
    </>
  );
}
