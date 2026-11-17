"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { nav, profile } from "@/data/profile";
import { DownloadIcon, MailIcon, WhatsAppIcon } from "./icons";
import MagneticButton from "./MagneticButton";
import styles from "./Nav.module.css";

// Hand-drawn underline that draws in on hover.
const SCRIBBLE = "M2 7 C 18 2, 30 11, 46 6 S 76 2, 98 6";

export default function Nav() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cleanups: (() => void)[] = [];
      ref.current!.querySelectorAll<HTMLAnchorElement>(`.${styles.link}`).forEach((link) => {
        const path = link.querySelector("path")!;
        gsap.set(path, { drawSVG: "0%" });
        const tl = gsap.timeline({ paused: true }).to(path, { drawSVG: "100%", duration: 0.45, ease: "power2.inOut" });
        const show = () => tl.timeScale(1).play();
        const hide = () => tl.timeScale(1.6).reverse();
        link.addEventListener("mouseenter", show);
        link.addEventListener("mouseleave", hide);
        link.addEventListener("focus", show);
        link.addEventListener("blur", hide);
        cleanups.push(() => {
          link.removeEventListener("mouseenter", show);
          link.removeEventListener("mouseleave", hide);
          link.removeEventListener("focus", show);
          link.removeEventListener("blur", hide);
        });
      });
      return () => cleanups.forEach((fn) => fn());
    },
    { scope: ref }
  );

  return (
    <header ref={ref} className={styles.header} data-intro="nav">
      <a href="#top" className={styles.brand} aria-label={`${profile.name}, back to top`}>
        {profile.name.toLowerCase()}
        <span className={styles.cursor} aria-hidden="true" />
      </a>

      <nav aria-label="Main" className={styles.links}>
        {nav.map((n) => (
          <a key={n.href} href={n.href} className={styles.link}>
            {n.label}
            <svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
              <path d={SCRIBBLE} />
            </svg>
          </a>
        ))}
      </nav>

      <div className={styles.actions}>
        <MagneticButton href={`mailto:${profile.email}`} icon={MailIcon} compact label="Email me">
          Let&apos;s talk
        </MagneticButton>
        <MagneticButton href={profile.whatsapp} external tone="whatsapp" icon={WhatsAppIcon} compact label="WhatsApp me">
          WhatsApp
        </MagneticButton>
        <MagneticButton href={profile.resume} external download tone="lilac" icon={DownloadIcon} compact label="Download resume">
          Resume
        </MagneticButton>
      </div>
    </header>
  );
}
