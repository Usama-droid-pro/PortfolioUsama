"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

declare global {
  interface Window {
    appLenis?: Lenis;
  }
}

// Window-level Lenis driven by GSAP's ticker so ScrollTrigger and Lenis
// share one frame loop.
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const touch = matchMedia("(pointer: coarse)").matches;
    const lenis = new Lenis({
      duration: touch ? 1.1 : 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    });
    window.appLenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onLoad = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    addEventListener("load", onLoad);

    return () => {
      removeEventListener("load", onLoad);
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.appLenis;
    };
  }, []);

  return null;
}
