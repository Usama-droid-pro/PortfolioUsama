"use client";

import { Fragment, useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { stack } from "@/data/profile";
import styles from "./Stack.module.css";

// Plain list of the stack, one row per layer. Rows rise in as their divider
// line draws across; hovering a row lights it up.
export default function Stack() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(ref);
      q(`.${styles.row}`).forEach((row) => {
        const rule = row.querySelector(`.${styles.rule}`);
        const content = row.querySelectorAll(`.${styles.label}, .${styles.tools}`);
        gsap
          .timeline({ scrollTrigger: { trigger: row, start: "top 88%", toggleActions: "play none none reverse" } })
          .from(rule, { scaleX: 0, duration: 1, ease: "power3.inOut" })
          .from(content, { yPercent: 40, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" }, 0.15);
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="stack" className={styles.stack}>
      <div className={styles.head}>
        <h2 className={styles.heading}>{stack.heading}</h2>
        <p className={styles.intro}>{stack.intro}</p>
      </div>

      <ul className={styles.rows}>
        {stack.rows.map((row) => (
          <li key={row.label} className={styles.row}>
            <span className={styles.rule} aria-hidden="true" />
            <h3 className={styles.label}>{row.label}</h3>
            <p className={styles.tools}>
              {row.tools.map((t, i) => (
                <Fragment key={t}>
                  <span className={styles.tool}>{t}</span>
                  {i < row.tools.length - 1 && <span className={styles.sep}>, </span>}
                </Fragment>
              ))}
              {"extra" in row && (
                <span className={styles.extra}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0c.6 6.4 5 11 12 12-7 1-11.4 5.6-12 12-.6-6.4-5-11-12-12C7 11 11.4 6.4 12 0Z" />
                  </svg>
                  {row.extra}
                </span>
              )}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
