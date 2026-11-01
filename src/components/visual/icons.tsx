/**
 * Line icons on a 24px grid: 1.75px strokes with square caps and mitred corners,
 * after the logo's orthogonal geometry. They are drawn in the text colour and
 * hidden from assistive technology; the link or button around them is named.
 */
const paths = {
  menu: "M4 6.5h16M4 12h16M4 17.5h16",
  close: "M6 6l12 12M18 6L6 18",
  // The forward arrows point to the end of a left-to-right line; site.css mirrors them in right-to-left text.
  forward: "M7 17L17 7M8.5 7H17v8.5",
  "forward-down": "M7 7l10 10M17 8.5V17H8.5",
  down: "M12 4v15M6 13l6 6 6-6",
  // The same arrow, never mirrored: copy that writes ↗ shows ↗ in either direction.
  external: "M7 17L17 7M8.5 7H17v8.5",
  // A horizontal arrow along the reading direction; mirrored like "forward".
  "forward-line": "M4 12h15M13 6l6 6-6 6",
  // Horizontal arrows keep the direction the copy gives them.
  right: "M4 12h15M13 6l6 6-6 6",
  left: "M20 12H5M11 6l-6 6 6 6",
  // Accepted: the fourth node of the process map.
  check: "M5 12.5l4.5 4.5L19 7.5",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      className={`icon icon-${name}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="square"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}

/** The icon for each arrow written in the copy; Arabic copy writes ↖ for forward, which "forward" draws in right-to-left text. */
const copyArrows: Record<string, IconName> = { "↖": "forward", "↗": "external", "←": "left", "→": "right", "↓": "down" };

/**
 * Link text whose copy starts or ends with a decorative arrow: the words stay as
 * written and the arrow is drawn as an icon in the same place, so it is not read
 * aloud and keeps pointing the way the copy points.
 */
export function ArrowText({ text }: { text: string }) {
  const match = text.match(/^([↖↗←→↓])\s+([^]*)$/) ?? text.match(/^([^]*?)\s+([↖↗←→↓])$/);
  if (!match) return text;
  const leading = copyArrows[match[1]] !== undefined;
  const arrow = leading ? match[1] : match[2];
  const words = leading ? match[2] : match[1];
  const icon = <Icon name={copyArrows[arrow]} size={16} />;
  return leading ? (
    <>
      {icon}
      {words}
    </>
  ) : (
    <>
      {words}
      {icon}
    </>
  );
}
