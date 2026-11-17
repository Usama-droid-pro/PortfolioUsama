"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { hero } from "@/data/profile";
import styles from "./HeroMarquee.module.css";

const PATH = "M-80 196 C 220 70, 500 40, 760 128 S 1210 250, 1520 96";
const REPEATS = 3;
const BASE_SPEED = 70; // svg units per second
const unit = hero.marquee.join("  +  ") + "  +  ";

// Curved band that hangs off the bottom of the hero. Text rides the path,
// drifts on its own, speeds up with scroll velocity and follows scroll direction.
export default function HeroMarquee() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const text = ref.current!.querySelector<SVGTextElement>("text")!;
      const textPath = text.querySelector("textPath")!;

      let unitLength = 0;
      let offset = 0;
      let dir = 1;
      let boost = 0;

      const measure = () => {
        unitLength = text.getComputedTextLength() / REPEATS;
      };

      const tick = (_t: number, deltaMs: number) => {
        if (!unitLength) return;
        offset -= (BASE_SPEED + boost) * dir * (deltaMs / 1000);
        offset = (offset % unitLength) - (offset > 0 ? unitLength : 0);
        textPath.setAttribute("startOffset", offset.toFixed(2));
        boost *= 0.93;
      };

      document.fonts.ready.then(measure);
      gsap.ticker.add(tick);

      const st = ScrollTrigger.create({
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          dir = self.direction;
          boost = Math.min(Math.abs(self.getVelocity()) / 4, 700);
        },
      });

      addEventListener("resize", measure);
      return () => {
        gsap.ticker.remove(tick);
        removeEventListener("resize", measure);
        st.kill();
      };
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={styles.marquee} aria-hidden="true">
      <svg viewBox="0 0 1440 300" preserveAspectRatio="xMidYMid slice">
        <defs>
          <path id="hero-marquee-path" d={PATH} />
        </defs>
        <path className={styles.band} d={PATH} data-intro="band" />
        <text className={styles.text} dy="0.36em" data-intro="band-text">
          <textPath href="#hero-marquee-path" startOffset="0">
            {unit.repeat(REPEATS)}
          </textPath>
        </text>
      </svg>
      <p className="sr-only">{hero.marquee.join(", ")}</p>
    </div>
  );
}
