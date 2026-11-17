"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import Image from "next/image";
import { work } from "@/data/profile";
import WorkArt from "./WorkArt";
import styles from "./Work.module.css";

export default function Work({ shots = {} }: { shots?: Record<string, string> }) {
  const ref = useRef<HTMLElement>(null);
  // Touch screens have no hover: a tap opens a card's "what I did" panel.
  const [open, setOpen] = useState<number | null>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      if (prefersReducedMotion()) return;
      let alive = true;

      const build = contextSafe!(() => {
        if (!alive) return;
        const q = gsap.utils.selector(ref);

        // Cards open out of a small rounded window while the tilt flattens.
        q(`.${styles.mask}`).forEach((mask, i) => {
          const card = mask.firstElementChild as HTMLElement;
          const side = i % 2 ? 1 : -1;
          gsap.set(mask, { clipPath: "inset(42% 42% 42% 42% round 2.5em)" });
          gsap.set(card, { scale: 1.4, rotationX: 22, rotationY: 14 * side, rotation: 4 * side, transformPerspective: 900 });
          gsap
            .timeline({
              delay: i * 0.08,
              defaults: { duration: 1.25, ease: "power3.out" },
              scrollTrigger: { trigger: mask, start: "top 85%", toggleActions: "play none none reverse" },
            })
            .to(mask, { clipPath: "inset(0% 0% 0% 0% round 1.5em)" }, 0)
            .to(card, { scale: 1, rotationX: 0, rotationY: 0, rotation: 0 }, 0);
        });
      });

      document.fonts.ready.then(build);
      return () => {
        alive = false;
      };
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="work" className={styles.work}>
      <div className={styles.head}>
        <p className={styles.label}>{work.label}</p>
        <h2 className={styles.heading}>{work.heading}</h2>
      </div>

      <ul className={styles.grid}>
        {work.projects.map((p, i) => (
          <li key={p.name} className={styles.mask}>
            <article className={`${styles.card} ${open === i ? styles.open : ""}`}>
              <div
                className={`${styles.media} ${styles[p.tone]}`}
                tabIndex={0}
                aria-label={`${p.name}: what I did`}
                onClick={() => setOpen(open === i ? null : i)}
              >
                {shots[p.name] ? (
                  <Image
                    src={shots[p.name]}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className={styles.shot}
                    draggable={false}
                  />
                ) : (
                  <WorkArt name={p.art} className={styles.art} />
                )}
                <p className={styles.metric}>
                  <span className={styles.metricValue}>{p.metric}</span>
                  <span className={styles.metricLabel}>{p.metricLabel}</span>
                </p>
                <span className={styles.hint} aria-hidden="true">
                  What I did
                </span>

                <div className={styles.points}>
                  <h4 className={styles.pointsTitle}>What I did</h4>
                  <ul>
                    {p.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={styles.detail}>
                <div>
                  <h3 className={styles.name}>{p.name}</h3>
                  <p className={styles.category}>{p.category}</p>
                </div>
                {"url" in p && (
                  <a className={styles.arrow} href={p.url} target="_blank" rel="noreferrer" aria-label={`Visit ${p.name}`}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </a>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>

    </section>
  );
}
