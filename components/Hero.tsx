"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { hero } from "@/data/profile";
import Nav from "./Nav";
import HeroMarquee from "./HeroMarquee";
import HeroDuo from "./HeroDuo";
import styles from "./Hero.module.css";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    (_ctx, contextSafe) => {
      if (prefersReducedMotion()) return;
      let alive = true;

      const play = contextSafe!(() => {
        if (!alive) return;
        const q = gsap.utils.selector(ref);

        const heading = new SplitText(q(`.${styles.heading}`), { type: "lines", mask: "lines", linesClass: styles.line });
        const intro = new SplitText(q(`.${styles.intro}`), { type: "lines", mask: "lines" });
        const pills = q(`.${styles.pill}`);
        const pillText = q(`.${styles.pillText}`);

        gsap.set(q("[data-intro]"), { visibility: "visible" });
        gsap.set(heading.lines, { yPercent: 110 });
        gsap.set(intro.lines, { yPercent: 110 });
        gsap.set(pills, { scale: 0.4, opacity: 0, rotation: (i) => hero.pills[i].rotate * 2.5 });
        gsap.set(pillText, { yPercent: 110 });
        gsap.set(q("[data-intro='band']"), { drawSVG: "50% 50%" });
        gsap.set(q("[data-intro='band-text']"), { opacity: 0 });

        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(q("[data-intro='duo']"), { xPercent: 12, opacity: 0, duration: 1.4 }, 0.35)
          .from(q("[data-intro='nav']"), { yPercent: -60, opacity: 0, duration: 0.8 }, 0.15)
          .to(heading.lines, { yPercent: 0, duration: 0.9, stagger: 0.12, ease: "back.out(1.4)" }, 0.25)
          .to(pills, { scale: 1, opacity: 1, rotation: (i) => hero.pills[i].rotate, duration: 0.6, stagger: 0.08, ease: "back.out(2.4)" }, 0.75)
          .to(pillText, { yPercent: 0, duration: 0.5, stagger: 0.08, ease: "back.out(1.6)" }, 0.9)
          .to(intro.lines, { yPercent: 0, duration: 0.7, stagger: 0.06 }, 0.85)
          .to(q("[data-intro='band']"), { drawSVG: "0% 100%", duration: 1.2, ease: "power2.inOut" }, 0.9)
          .to(q("[data-intro='band-text']"), { opacity: 1, duration: 0.5 }, 1.6);
      });

      document.fonts.ready.then(play);
      return () => {
        alive = false;
      };
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="top" className={styles.hero}>
      <Nav />

      <div className={styles.stage}>
        <HeroDuo />
      </div>

      <div className={styles.content}>
        <h1 className={styles.heading} data-intro="heading">
          {hero.headingLines.map((line) => (
            <span key={line} className={styles.headingLine}>
              {line}{" "}
            </span>
          ))}
        </h1>

        <p className={styles.intro} data-intro="intro">
          {hero.intro}
        </p>

        <ul className={styles.pills} data-intro="pills">
          {hero.pills.map((p, i) => (
            <li
              key={p.text}
              className={`${styles.pill} ${styles[p.tone]} ${styles[`pos${i}`]}`}
              style={{ "--r": `${p.rotate}deg` } as React.CSSProperties}
            >
              <span className={styles.pillMask}>
                <span className={styles.pillText}>{p.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <HeroMarquee />
    </section>
  );
}
