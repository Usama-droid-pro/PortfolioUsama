"use client";

import { useEffect, useRef } from "react";
import { hero } from "@/data/profile";
import { prefersReducedMotion } from "@/lib/gsap";
import styles from "./HeroDuo.module.css";

// Plays the whole clip on a loop: steady walk, gesture, robot wave, back to
// the walk. The last frame flows straight into the first, so the native loop
// has no visible jump. (The clip has no clean shorter walk loop: the head turn
// and the wave overlap every full stride.)
export default function HeroDuo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current!;
    const webkit = /Apple/.test(navigator.vendor);
    video.muted = true; // React doesn't reliably reflect `muted`; autoplay needs it
    video.src = webkit ? hero.video.mov : hero.video.webm;
    if (prefersReducedMotion()) return; // poster only

    // Only decode while the hero is on screen.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <div className={styles.duo} data-intro="duo" aria-hidden="true">
      <div className={styles.spotlight} />
      <div className={styles.shadow} />
      <video ref={ref} className={styles.video} poster={hero.video.poster} muted loop playsInline preload="auto" />
    </div>
  );
}
