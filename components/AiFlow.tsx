"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { aiFlow } from "@/data/profile";
import styles from "./AiFlow.module.css";

const num = (i: number) => String(i + 1).padStart(2, "0");

// Tint for a code line: headings/frontmatter, done marks, flagged marks.
const lineClass = (line: string) => {
  if (/^(#|---)/.test(line)) return styles.cHead;
  if (/^(✓|\[x\])/.test(line)) return styles.cOk;
  if (/^(✗|\[~\])/.test(line)) return styles.cFlag;
  return undefined;
};

// Six steps scroll past on the right while the step list stays put on the
// left; the list's dot and line follow the scroll.
export default function AiFlow() {
  const ref = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const steps = q(`.${styles.step}`);

      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });

      if (prefersReducedMotion()) return;

      // Progress line fills as the steps scroll by.
      gsap.fromTo(
        q(`.${styles.fill}`),
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          // From the first step's top to the last step's bottom, both at 55% of the viewport.
          scrollTrigger: { trigger: stepsRef.current, start: "top 55%", end: "bottom 55%", scrub: true },
        }
      );

      // Each code card prints its lines once, like output arriving.
      q(`.${styles.card}`).forEach((card) => {
        gsap.from(card.querySelectorAll(`.${styles.line}`), {
          opacity: 0,
          x: -8,
          duration: 0.35,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 80%", once: true },
        });
      });
    },
    { scope: ref }
  );

  const jump = (i: number) => {
    const step = ref.current?.querySelectorAll(`.${styles.step}`)[i] as HTMLElement | undefined;
    if (!step) return;
    const y = step.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.2;
    if (window.appLenis) window.appLenis.scrollTo(y);
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section ref={ref} id="ai" className={styles.ai}>
      <div className={styles.side}>
        <p className={styles.label}>{aiFlow.label}</p>
        <h2 className={styles.heading}>{aiFlow.heading}</h2>
        <p className={styles.intro}>{aiFlow.intro}</p>

        <div className={styles.navWrap}>
          <span className={styles.track} aria-hidden="true">
            <span className={styles.fill} />
          </span>
          <ol className={styles.nav}>
            {aiFlow.steps.map((s, i) => (
              <li key={s.title}>
                <button
                  type="button"
                  className={styles.navItem}
                  aria-current={active === i ? "step" : undefined}
                  onClick={() => jump(i)}
                >
                  <span className={styles.navNum}>{num(i)}</span>
                  {s.title}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div ref={stepsRef}>
        {aiFlow.steps.map((s, i) => (
          <article key={s.title} className={styles.step}>
            <span className={styles.stepNum}>{num(i)}</span>
            <h3 className={styles.title}>{s.title}</h3>
            <p className={styles.body}>{s.body}</p>

            <figure className={styles.card}>
              <figcaption className={styles.file}>{s.file}</figcaption>
              <pre className={styles.code}>
                {s.code.map((line, j) => (
                  <span key={j} className={`${styles.line} ${lineClass(line) ?? ""}`}>
                    {line}
                    {"\n"}
                  </span>
                ))}
              </pre>
            </figure>
          </article>
        ))}
      </div>
    </section>
  );
}
