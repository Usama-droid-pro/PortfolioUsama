"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { faq, profile } from "@/data/profile";
import MagneticButton from "./MagneticButton";
import styles from "./Faq.module.css";

// Questions as a chat: the open question shrinks to a bubble and the answer
// comes back as a reply with an avatar. One answer open at a time.
export default function Faq() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(gsap.utils.toArray(`.${styles.item}`, ref.current), {
        opacity: 0,
        y: 32,
        duration: 0.7,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: { trigger: `.${styles.list}`, start: "top 80%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="faq" className={styles.faq}>
      <div className={styles.side}>
        <p className={styles.label}>{faq.label}</p>
        <h2 className={styles.heading}>{faq.heading}</h2>
        <div className={styles.aside}>
          <p>{faq.aside}</p>
          <MagneticButton href={`mailto:${profile.email}`}>{faq.asideCta}</MagneticButton>
        </div>
      </div>

      <ul className={styles.list}>
        {faq.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.q} className={`${styles.item} ${isOpen ? styles.open : ""}`}>
              <h3 className={styles.qWrap}>
                <button
                  type="button"
                  className={styles.question}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  id={`faq-q-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  {item.q}
                </button>
              </h3>
              <div
                id={`faq-${i}`}
                role="region"
                aria-labelledby={`faq-q-${i}`}
                className={styles.panel}
                // Page height changed: re-measure later scroll triggers.
                onTransitionEnd={(e) => e.target === e.currentTarget && ScrollTrigger.refresh()}
              >
                <div className={styles.clip}>
                  <div className={styles.reply}>
                    <p className={styles.answer}>{item.a}</p>
                    <span className={styles.avatar} aria-hidden="true">
                      {profile.name.charAt(0)}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
