import { useEffect } from "react";

/**
 * Sets the document title and meta description for the current page.
 * This replaces TanStack Start's SSR-only head management (HeadContent/Scripts),
 * since this app now renders purely on the client as a standard Vite SPA.
 */
export function useDocumentHead(title: string, description?: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    let metaDescription: HTMLMetaElement | null = null;
    let previousDescription: string | null = null;

    if (description) {
      metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        document.head.appendChild(metaDescription);
      }
      previousDescription = metaDescription.getAttribute("content");
      metaDescription.setAttribute("content", description);
    }

    return () => {
      document.title = previousTitle;
      if (metaDescription && previousDescription !== null) {
        metaDescription.setAttribute("content", previousDescription);
      }
    };
  }, [title, description]);
}
