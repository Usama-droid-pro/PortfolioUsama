"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { techStack, toolbox } from "@/data/profile";
import { techIcons } from "@/lib/techIcons";
import styles from "./TechStack.module.css";

// Brand colour on the ink background: near-black logos go white, darker
// colours get lifted toward white so they stay readable but keep their hue.
const tint = (hex: string) => {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  if (lum < 0.08) return "var(--paper)";
  if (lum < 0.22) return `color-mix(in srgb, #${hex} 70%, var(--paper))`;
  return `#${hex}`;
};

// Tools whose logo is a repeat or a generic mark go in the text line instead.
const textOnly = ["Claude skills", "Specs & task docs"];

// Logo tiles for every other tool with an icon.
const tiles = toolbox.tools.flatMap((t) =>
  "icon" in t && !textOnly.includes(t.name) ? [{ name: t.name, icon: techIcons[t.icon] }] : []
);

// Skills without a logo, as one line of text.
const also = toolbox.tools.flatMap((t) =>
  (!("icon" in t) && !("special" in t)) || textOnly.includes(t.name) ? [t.name] : []
);

// Simple grid of logos and names; tiles pop in once as the grid scrolls in.
export default function TechStack() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(gsap.utils.toArray(`.${styles.tile}`, ref.current), {
        opacity: 0,
        y: 24,
        scale: 0.85,
        duration: 0.6,
        stagger: { each: 0.025, grid: "auto", from: "start" },
        ease: "back.out(1.8)",
        scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="stack" className={styles.stack}>
      <h2 className={styles.heading}>{techStack.heading}</h2>

      <ul className={styles.grid}>
        {tiles.map((t) => (
          <li key={t.name} className={styles.tile}>
            <svg className={styles.logo} viewBox="0 0 24 24" style={{ color: tint(t.icon.hex) }} aria-hidden="true">
              <path d={t.icon.path} />
            </svg>
            <span className={styles.name}>{t.name}</span>
          </li>
        ))}
      </ul>

      <div className={styles.foot}>
        <p className={styles.also}>
          <span className={styles.alsoLabel}>{techStack.alsoLabel}: </span>
          {also.join(", ")}.
        </p>
        <p className={styles.promise}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0c.6 6.4 5 11 12 12-7 1-11.4 5.6-12 12-.6-6.4-5-11-12-12C7 11 11.4 6.4 12 0Z" />
          </svg>
          {techStack.promise}
        </p>
      </div>
    </section>
  );
}
