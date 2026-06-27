/**
 * Build-time email obfuscation.
 *
 * Returns an opaque `token` (base64 of the address, then reversed) that carries
 * no `@`, no `mailto:`, and no dotted domain, so regex-based address harvesters
 * scraping the static HTML find nothing to grab. The companion client script in
 * `MailLink.astro` reverses the transform and wires up a real `mailto:` link.
 *
 * `masked` is a human-readable, un-harvestable fallback (e.g. "you [at]
 * example [dot] com") shown when JavaScript is unavailable.
 */
export function obfuscateEmail(email: string) {
  const token = btoa(email).split("").reverse().join("");
  const masked = email.replace("@", " [at] ").replaceAll(".", " [dot] ");
  return { token, masked };
}
