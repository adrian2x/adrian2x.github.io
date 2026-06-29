import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://adrian2x.github.io/",
    // TODO: tweak title / description / timezone to taste.
    title: "Adrian Cruz",
    description: "Notes on investing, software, and building things.",
    author: "Adrian Cruz",
    profile: "https://github.com/adrian2x",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "America/Los_Angeles",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: true,
      url: "https://github.com/adrian2x/adrian2x.github.io/edit/main/",
    },
    search: "pagefind",
  },
  // TODO: add x / linkedin handles if you want them shown.
  socials: [
    { name: "github",   url: "https://github.com/adrian2x" },
    { name: "linkedin", url: "https://www.linkedin.com/in/adrian2x" },
    { name: "mail",     url: "mailto:kangoonie@gmail.com" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});