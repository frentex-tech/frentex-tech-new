"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Locale } from "@/i18n/config";

export interface StoryStep {
  number: string;
  badge: string;
  title: string;
  description: string;
  highlights: string[];
}

interface StickyStorytellingProps {
  locale: Locale;
  heading: string;
  lead: string;
  steps: StoryStep[];
  visualComponent: ReactNode;
  theme?: "dark" | "light";
}

export function StickyStorytelling({
  locale,
  heading,
  lead,
  steps,
  visualComponent,
  theme = "dark",
}: StickyStorytellingProps) {
  const isAr = locale === "ar";
  const [activeStep, setActiveStep] = useState<number>(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((el, index) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveStep(index);
            }
          }
        },
        {
          threshold: 0.5,
          rootMargin: "-10% 0px -40% 0px",
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [steps]);

  return (
    <section className={`sticky-storytelling-section theme-${theme}`}>
      <div className="wrap">
        {/* Section Header */}
        <div className="storytelling-header">
          <span className="story-eyebrow">
            {isAr ? "معمارية تفاعلية مدفوعة بالخطوات" : "Interactive Phased Architecture"}
          </span>
          <h2 className="story-title">{heading}</h2>
          <p className="story-lead">{lead}</p>
        </div>

        {/* Two-Column Sticky Showcase */}
        <div className="sticky-showcase-grid">
          {/* Pinned Visual Column */}
          <div className="sticky-visual-column">
            <div className="sticky-visual-pin">
              {visualComponent}
            </div>
          </div>

          {/* Scrolling Story Cards Column */}
          <div className="story-cards-column">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.number}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  className={`story-step-card scroll-reveal-item ${isActive ? "active-step" : ""}`}
                  data-step-index={idx}
                >
                  <div className="step-card-header">
                    <span className="step-number">{step.number}</span>
                    <span className="step-badge">{step.badge}</span>
                  </div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                  <div className="step-highlights">
                    {step.highlights.map((h, i) => (
                      <span key={i} className="highlight-tag">
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
