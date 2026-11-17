"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import styles from "./MagneticButton.module.css";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean; // opens in a new tab
  download?: boolean;
  tone?: "butter" | "whatsapp" | "lilac";
  icon?: React.ReactNode;
  compact?: boolean; // phones: icon only
  label?: string; // accessible name when compact
};

// Pill link that leans toward the cursor; a circle fill grows from the
// entry point on hover and the whole thing springs back on leave.
export default function MagneticButton({ href, children, className, external, download, tone = "butter", icon, compact, label }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const btn = ref.current!;
      if (matchMedia("(pointer: coarse)").matches) return;

      const fill = btn.querySelector<HTMLElement>(`.${styles.fill}`)!;
      const label = btn.querySelector<HTMLElement>(`.${styles.label}`)!;
      const xTo = gsap.quickTo(btn, "x", { duration: 0.35, ease: "power3.out" });
      const yTo = gsap.quickTo(btn, "y", { duration: 0.35, ease: "power3.out" });
      const lxTo = gsap.quickTo(label, "x", { duration: 0.35, ease: "power3.out" });
      const lyTo = gsap.quickTo(label, "y", { duration: 0.35, ease: "power3.out" });

      const enter = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        gsap.set(fill, { x: e.clientX - r.left, y: e.clientY - r.top });
        gsap.to(fill, { scale: 1, duration: 0.5, ease: "power3.out", overwrite: true });
      };
      const move = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2 - (gsap.getProperty(btn, "x") as number));
        const dy = e.clientY - (r.top + r.height / 2 - (gsap.getProperty(btn, "y") as number));
        xTo(dx * 0.3);
        yTo(dy * 0.4);
        lxTo(dx * 0.12);
        lyTo(dy * 0.12);
      };
      const leave = () => {
        gsap.to(fill, { scale: 0, duration: 0.4, ease: "power2.in", overwrite: true });
        gsap.to([btn, label], { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)", overwrite: true });
      };

      btn.addEventListener("mouseenter", enter);
      btn.addEventListener("mousemove", move);
      btn.addEventListener("mouseleave", leave);
      return () => {
        btn.removeEventListener("mouseenter", enter);
        btn.removeEventListener("mousemove", move);
        btn.removeEventListener("mouseleave", leave);
      };
    },
    { scope: ref }
  );

  return (
    <a
      ref={ref}
      href={href}
      className={`${styles.btn} ${styles[tone]} ${compact ? styles.compact : ""} ${className ?? ""}`}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      {...(download ? { download: true } : {})}
    >
      <span className={styles.fill} aria-hidden="true" />
      <span className={styles.label}>
        {icon}
        <span className={styles.text}>{children}</span>
      </span>
    </a>
  );
}
