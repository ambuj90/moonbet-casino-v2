import { useEffect } from "react";

export function useSeo({
  title,
  description,
  keywords,
  ogImage,
  ogUrl,
} = {}) {
  useEffect(() => {
    // Title
    if (title) document.title = title;

    // Helper: set/update a meta tag
    const setMeta = (selector, attrs) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        Object.keys(attrs).forEach((k) => el.setAttribute(k, attrs[k]));
        document.head.appendChild(el);
      } else {
        Object.keys(attrs).forEach((k) => el.setAttribute(k, attrs[k]));
      }
    };

    if (description) setMeta('meta[name="description"]', { name: "description", content: description });
    if (keywords) setMeta('meta[name="keywords"]', { name: "keywords", content: keywords });

    // Open Graph
    if (title) setMeta('meta[property="og:title"]', { property: "og:title", content: title });
    if (description) setMeta('meta[property="og:description"]', { property: "og:description", content: description });
    if (ogImage) setMeta('meta[property="og:image"]', { property: "og:image", content: ogImage });
    setMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    if (ogUrl) setMeta('meta[property="og:url"]', { property: "og:url", content: ogUrl });
  }, [title, description, keywords, ogImage, ogUrl]);
}
