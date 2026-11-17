"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { about } from "@/data/profile";
import styles from "./About.module.css";

// Scroll distance the section stays pinned for, per breakpoint.
const pinDistance = () => {
  const w = window.innerWidth;
  if (w < 480) return 1150;
  if (w < 992) return 1550;
  return 2200;
};

// Pinned statement. While pinned, each letter wakes up in cobalt (bigger,
// tilted) and settles into ink, left to right with the scroll. Pills pop in
// as the scrub passes them.
export default function About() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      if (prefersReducedMotion()) return;
      let alive = true;

      const build = contextSafe!(() => {
        if (!alive) return;
        const q = gsap.utils.selector(ref);
        const split = new SplitText(q(`.${styles.text}`), { type: "words,chars", charsClass: styles.char });
        const chars = split.chars;
        const pills = q(`.${styles.pill}`);

        gsap.set(chars, { color: "rgb(14 18 64 / 0.14)" });
        gsap.set(pills, { opacity: 0, scale: 0.5, y: 30, rotation: (i) => about.pills[i].rotate * 3 });

        // Timeline runs on a 0–100 scale so positions read as % of the scroll.
        const tl = gsap.timeline({
          defaults: { duration: 3.5 },
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${pinDistance()}`,
            pin: true,
            scrub: window.innerWidth < 992 ? 0.6 : 0.8,
            anticipatePin: 1,
            refreshPriority: 1, // measure the pin first so every later trigger includes its spacing
            invalidateOnRefresh: true,
          },
        });

        chars.forEach((char, i) => {
          const t = (i / chars.length) * 85;
          tl.to(char, { color: "#2f3cff", scale: 1.14, rotation: gsap.utils.random(-5, 5), ease: "power1.out" }, t)
            .to(char, { color: "#0e1240", scale: 1, rotation: 0, ease: "power1.inOut" }, t + 3.5);
        });

        pills.forEach((pill, i) => {
          tl.to(
            pill,
            { opacity: 1, scale: 1, y: 0, rotation: about.pills[i].rotate, duration: 6, ease: "back.out(2)" },
            about.pills[i].at * 100
          );
        });

        // The pin adds scroll distance; triggers made earlier (the AI section's
        // progress bar) must re-measure or they start in the wrong place.
        ScrollTrigger.refresh();
      });

      document.fonts.ready.then(build);
      return () => {
        alive = false;
      };
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="about" className={styles.about}>
      <div className={styles.inner}>
        <h2 className={styles.label}>{about.label}</h2>
        <p className={styles.text}>{about.text}</p>

        <ul className={styles.pills}>
          {about.pills.map((p, i) => (
            <li
              key={p.text}
              className={`${styles.pill} ${styles[p.tone]} ${styles[`pos${i}`]}`}
              style={{ "--r": `${p.rotate}deg` } as React.CSSProperties}
            >
              {p.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
