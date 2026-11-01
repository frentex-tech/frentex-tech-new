"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  threshold?: number;
}

/**
 * ScrollReveal activates progressive rise-and-settle animations when elements
 * scroll into the viewport.
 *
 * Strict Accessibility & Zero-JS Guard:
 * Elements are statically visible by default. Hidden initial states only exist
 * under `html[data-motion="ok"] .scroll-reveal-item:not([data-visible="true"])`.
 * Under `prefers-reduced-motion: reduce`, all transitions are disabled.
 */
export function ScrollReveal({
  children,
  className = "",
  staggerDelay = 80,
  threshold = 0.12,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // If reduced-motion is requested, mark visible immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      container.setAttribute("data-visible", "true");
      container.querySelectorAll(".scroll-reveal-item").forEach((el) => {
        el.setAttribute("data-visible", "true");
      });
      return;
    }

    if (!document.documentElement.getAttribute("data-motion")) {
      document.documentElement.setAttribute("data-motion", "ok");
    }

    // Mark as scroll-ready now that JS has successfully initialized
    container.classList.add("is-scroll-ready");

    const triggerVisible = () => {
      container.setAttribute("data-visible", "true");
      const items = container.querySelectorAll<HTMLElement>(".scroll-reveal-item");
      items.forEach((item, index) => {
        setTimeout(() => {
          item.setAttribute("data-visible", "true");
        }, index * staggerDelay);
      });
    };

    // If already in viewport on initial load
    const rect = container.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      triggerVisible();
      return;
    }

    if (!("IntersectionObserver" in window)) {
      triggerVisible();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            triggerVisible();
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [staggerDelay, threshold]);

  return (
    <div ref={containerRef} className={`scroll-reveal-container ${className}`}>
      {children}
    </div>
  );
}

interface RevealChoreographyProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
  theme?: "dark" | "light";
}

/**
 * RevealChoreography reveals section headers in a carefully timed sequence:
 * 1. Eyebrow badge (0ms)
 * 2. Main title (100ms)
 * 3. Description (200ms)
 * 4. Actions / CTAs (300ms)
 *
 * Keeps whole phrases intact to prevent splitting Arabic text unnaturally.
 */
export function RevealChoreography({
  eyebrow,
  title,
  description,
  actions,
  className = "",
  theme = "light",
}: RevealChoreographyProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.setAttribute("data-choreography-visible", "true");
      return;
    }

    const setVisible = () => el.setAttribute("data-choreography-visible", "true");

    // If already in viewport on mount (e.g. hero), reveal smoothly right away
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      const timer = setTimeout(setVisible, 40);
      return () => clearTimeout(timer);
    }

    if (!("IntersectionObserver" in window)) {
      setVisible();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`reveal-choreography-block theme-${theme} ${className}`}
    >
      {eyebrow && <div className="choreo-eyebrow">{eyebrow}</div>}
      <div className="choreo-title">{title}</div>
      {description && <div className="choreo-desc">{description}</div>}
      {actions && <div className="choreo-actions">{actions}</div>}
    </div>
  );
}
