export const siteName = "Frentex Tech";

/** Public URL used for canonical links and the social image, as published on `main`. */
export const siteUrl = "https://frntextech.com";

export const contact = {
  phoneDisplay: "+966 59 200 5751",
  phoneHref: "tel:+966592005751",
  whatsappHref: "https://wa.me/966592005751",
  email: "INFO@frntextech.com",
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefixes a file from `public/` with the configured base path.
 * `next/link` does this automatically; plain `<img>` and download links do not.
 */
export function asset(path: string): string {
  return `${basePath}${path}`;
}
