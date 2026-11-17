"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { experience, profile } from "@/data/profile";
import styles from "./Experience.module.css";

// Quiet work history: logo, company, role and dates on one line, one sentence under it.
export default function Experience({ logos = {} }: { logos?: Record<string, string> }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(gsap.utils.toArray(`.${styles.row}`, ref.current), {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: `.${styles.list}`, start: "top 85%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="experience" className={styles.experience}>
      <h2 className={styles.heading}>{experience.heading}</h2>

      <ol className={styles.list}>
        {experience.jobs.map((j) => (
          <li key={j.company} className={styles.row}>
            <span className={styles.logo}>
              {logos[j.logo] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logos[j.logo]} alt="" />
              ) : (
                <span aria-hidden="true">{j.company.charAt(0)}</span>
              )}
            </span>
            <div className={styles.main}>
              <h3 className={styles.company}>{j.company}</h3>
              <p className={styles.role}>
                {j.role}, {j.location}
              </p>
              <p className={styles.summary}>{j.summary}</p>
            </div>
            <p className={styles.period}>{j.period}</p>
          </li>
        ))}
      </ol>

      <div className={styles.foot}>
        <p>{experience.education}</p>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          {experience.linkedinCta} ↗
        </a>
      </div>
    </section>
  );
}
