"use client";

import { useEffect } from "react";

/**
 * Progressive-enhancement scroll reveal. Elements marked [data-reveal] render
 * fully visible by default — no-JS and prefers-reduced-motion both fall back
 * to "just show it". Once mounted (and motion is allowed), each target is
 * armed with data-revealed="false", then flipped to "true" the first time it
 * enters the viewport and stops being observed.
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (targets.length === 0) return;

    targets.forEach((el) => el.setAttribute("data-revealed", "false"));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "true");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
