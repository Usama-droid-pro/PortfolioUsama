"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { showcase } from "@/data/profile";
import styles from "./Showcase.module.css";

// Three copies of the photo set, so one set can wrap while the others fill the screen.
const SETS = 3;

// Infinite photo marquee. It drifts right-to-left on its own, flips direction
// when you scroll up, speeds up with scroll velocity, and slides near the
// centre of the screen shrink slightly (0.95 at centre, 1 at the sides).
export default function Showcase() {
  const ref = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current!;
      const track = trackRef.current!;
      const slides = Array.from(track.querySelectorAll<HTMLElement>(`.${styles.slide}`));
      const perSet = showcase.photos.length;

      if (prefersReducedMotion()) return;

      const speedMultiplier = 1 + (Math.max(1, Math.min(showcase.speed, 5)) - 1) * 0.3;
      const BASE_SPEED = 1.5 * speedMultiplier;

      // Distance from a slide to its twin in the next set = width of one set.
      let setWidth = 0;
      const measure = () => {
        const d = slides[perSet].offsetLeft - slides[0].offsetLeft;
        if (d > 0) setWidth = d;
      };
      measure();
      addEventListener("load", measure);
      addEventListener("resize", measure);

      let currentX = 0;
      let targetDirection = -1; // -1 = right-to-left (scrolling down), 1 = left-to-right (scrolling up)
      let currentDirection = -1;
      let scrollVelocityBoost = 0;

      const st = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const dir = self.direction === 1 ? -1 : 1;
          targetDirection = dir;
          const vel = Math.abs(self.getVelocity() || 0);
          scrollVelocityBoost = Math.min(vel / 220, 10 * speedMultiplier) * dir;
        },
      });

      const tick = () => {
        currentDirection += (targetDirection - currentDirection) * 0.06;
        scrollVelocityBoost *= 0.92;
        currentX += BASE_SPEED * currentDirection + scrollVelocityBoost;

        // Seamless wrap without modulo truncation.
        if (setWidth > 0) {
          while (currentX <= -setWidth) currentX += setWidth;
          while (currentX > 0) currentX -= setWidth;
        }
        gsap.set(track, { x: currentX, force3D: true });

        // Proximity scale: 0.95 at the centre, 1 at the sides.
        const rect = wrapper.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > innerHeight) return; // off screen: skip the work
        const center = rect.left + rect.width / 2;
        const half = rect.width * 0.45 || 400;
        for (const slide of slides) {
          const r = slide.getBoundingClientRect();
          const norm = Math.min(1, Math.abs(r.left + r.width / 2 - center) / half);
          gsap.set(slide, { scale: 0.95 + 0.05 * norm, transformOrigin: "center center" });
        }
      };
      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        st.kill();
        removeEventListener("load", measure);
        removeEventListener("resize", measure);
      };
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className={styles.showcase} aria-label={showcase.heading}>
      <h2 className={styles.heading}>{showcase.heading}</h2>
      <div ref={wrapperRef} className={styles.wrapper}>
        <div ref={trackRef} className={styles.track}>
          {Array.from({ length: SETS }, (_, set) =>
            showcase.photos.map((file) => (
              <div key={`${set}-${file}`} className={styles.slide} aria-hidden={set > 0 || undefined}>
                <Image
                  className={styles.img}
                  src={`/clicks/${file}`}
                  alt=""
                  fill
                  sizes="500px"
                  quality={80}
                  loading="eager"
                  draggable={false}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
