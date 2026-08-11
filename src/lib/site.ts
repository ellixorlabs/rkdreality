export const SITE_URL = "https://rkdreality.com";

export const SITE_NAME = "RKD Reality";

export const ELLIXOR_LABS = {
  name: "Ellixor Labs",
  url: "https://ellixorlabs.com",
} as const;

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) return path;
  return new URL(path, `${SITE_URL}/`).toString();
}
