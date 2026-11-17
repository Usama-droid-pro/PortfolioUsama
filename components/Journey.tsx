"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { journey } from "@/data/profile";
import { techIcons } from "@/lib/techIcons";
import styles from "./Journey.module.css";

// Track geometry, in em (the SVG viewBox uses the same units, so 1 unit = 1em
// and the line scales with the fluid type). The band is BAND em tall and sits
// on the vertical centre of the pinned screen.
const LEAD = 46; // room for the heading; the dot starts before the first stop
const GAP = 38; // distance between stops
const BAND = 14;
const HIGH = 3.5; // stop y on even stops (cards above the line)
const LOW = 10.5; // stop y on odd stops (cards below)
const ANCHOR = 0.42; // the dot rides at this fraction of the screen width
const CARD_OFFSET = 4.5; // gap from the centre line to a card (matches .above/.below)
const SAFE = 28; // px kept clear at the top and bottom of the screen

const stops = journey.stops.map((s, i) => ({ ...s, x: LEAD + i * GAP, y: i % 2 ? LOW : HIGH }));
const START = { x: LEAD - 18, y: HIGH };
const END = { x: stops[stops.length - 1].x + 12, y: stops[stops.length - 1].y };
const WIDTH = END.x + 2;

// Smooth wave through every stop, flat at each stop.
const pathD = [START, ...stops, END]
  .map((p, i, all) => {
    if (i === 0) return `M${p.x} ${p.y}`;
    const prev = all[i - 1];
    const h = (p.x - prev.x) / 2;
    return `C${prev.x + h} ${prev.y} ${p.x - h} ${p.y} ${p.x} ${p.y}`;
  })
  .join(" ");

export default function Journey() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      if (prefersReducedMotion()) return;
      let alive = true;
      let removeFit = () => {};

      const build = contextSafe!(() => {
        if (!alive) return;
        const section = ref.current!;
        const q = gsap.utils.selector(section);
        const track = q(`.${styles.track}`)[0] as HTMLElement;
        const done = section.querySelector<SVGPathElement>(`.${styles.lineDone}`)!;
        const dot = q(`.${styles.dot}`)[0] as HTMLElement;
        const cards = q(`.${styles.card}`);
        const nodes = q(`.${styles.node}`);

        section.classList.add(styles.live);

        // Sample the path once: for any x along the track, where is the line
        // (y) and how much of it is behind the dot (length)?
        const total = done.getTotalLength();
        const N = 600;
        const xs: number[] = [];
        const ys: number[] = [];
        const ls: number[] = [];
        for (let i = 0; i <= N; i++) {
          const l = (i / N) * total;
          const pt = done.getPointAtLength(l);
          xs.push(pt.x);
          ys.push(pt.y);
          ls.push(l);
        }
        const at = (x: number) => {
          if (x <= xs[0]) return { y: ys[0], l: 0 };
          if (x >= xs[N]) return { y: ys[N], l: total };
          let lo = 0;
          let hi = N;
          while (hi - lo > 1) {
            const mid = (lo + hi) >> 1;
            if (xs[mid] < x) lo = mid;
            else hi = mid;
          }
          const t = (x - xs[lo]) / (xs[hi] - xs[lo] || 1);
          return { y: ys[lo] + (ys[hi] - ys[lo]) * t, l: ls[lo] + (ls[hi] - ls[lo]) * t };
        };
        gsap.set(done, { strokeDasharray: total, strokeDashoffset: total });

        // Each stop wakes up when the dot reaches it, and sleeps if you scroll back.
        const wakes = cards.map((card, i) => {
          const pills = card.querySelectorAll(`.${styles.pill}`);
          const tl = gsap.timeline({ paused: true });
          tl.to(nodes[i], { scale: 1, backgroundColor: "#ffd23f", duration: 0.35, ease: "back.out(3)" }, 0)
            .to(card.querySelector(`.${styles.cardText}`), { opacity: 1, duration: 0.3 }, 0)
            .fromTo(
              pills,
              { opacity: 0, scale: 0.4, y: 14, rotation: () => gsap.utils.random(-14, 14) },
              { opacity: 1, scale: 1, y: 0, rotation: () => gsap.utils.random(-4, 4), duration: 0.5, stagger: 0.06, ease: "back.out(2.2)" },
              0.05
            );
          return tl;
        });
        gsap.set(nodes, { scale: 0.6 });
        gsap.set(cards.map((c) => c.querySelectorAll(`.${styles.pill}`)), { opacity: 0, scale: 0.4 });
        const awake = stops.map(() => false);

        const em = () => parseFloat(getComputedStyle(track).fontSize);

        // Fit to the screen height: every card hangs CARD_OFFSET em above or
        // below the centre line, so scale the whole track (all em-based) until
        // the tallest card plus its offset fits in half the screen.
        const fit = () => {
          track.style.setProperty("--h", "1");
          const e = em();
          const head = q(`.${styles.head}`)[0] as HTMLElement;
          const tallest = Math.max(head.offsetHeight, ...cards.map((card) => (card as HTMLElement).offsetHeight));
          const room = section.clientHeight / 2 - SAFE;
          const scale = Math.min(1, Math.max(0.5, room / (CARD_OFFSET * e + tallest)));
          track.style.setProperty("--h", scale.toFixed(3));
        };
        fit();
        ScrollTrigger.addEventListener("refreshInit", fit);
        removeFit = () => ScrollTrigger.removeEventListener("refreshInit", fit);
        // Scroll until the dot is just past the last stop and the last card
        // is fully on screen, whichever needs more. Offsets ignore transforms.
        const lastCard = cards[cards.length - 1] as HTMLElement;
        const distance = () => {
          const e = em();
          const right = Math.max(
            ...Array.from(lastCard.querySelectorAll<HTMLElement>(`.${styles.pill}, .${styles.cardText}`)).map(
              (el) => el.offsetLeft + el.offsetWidth + (el.offsetParent === lastCard ? 0 : (el.offsetParent as HTMLElement).offsetLeft)
            )
          );
          const byDot = (stops[stops.length - 1].x + 3) * e - window.innerWidth * ANCHOR;
          const byCard = lastCard.offsetLeft + right + 2.5 * e - window.innerWidth;
          return Math.max(byDot, byCard);
        };

        const update = () => {
          const e = em();
          const trackX = gsap.getProperty(track, "x") as number;
          const x = (window.innerWidth * ANCHOR - trackX) / e; // dot's x on the track, in em
          const { y, l } = at(x);
          const cx = Math.min(Math.max(x, START.x), END.x);
          gsap.set(dot, { x: cx * e, y: (y - BAND / 2) * e });
          done.style.strokeDashoffset = String(total - l);
          stops.forEach((s, i) => {
            const on = x >= s.x - 0.5;
            if (on !== awake[i]) {
              awake[i] = on;
              if (on) wakes[i].play();
              else wakes[i].reverse();
            }
          });
        };

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          onUpdate: update,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: update,
          },
        });
        update();
      });

      document.fonts.ready.then(build);
      return () => {
        alive = false;
        removeFit();
      };
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="process" className={styles.journey}>
      <div className={styles.track} style={{ width: `${WIDTH}em` }}>
        <div className={styles.head}>
          <h2 className={styles.heading}>{journey.heading}</h2>
          <p className={styles.intro}>{journey.intro}</p>
        </div>

        <div className={styles.band}>
          <svg className={styles.line} viewBox={`0 0 ${WIDTH} ${BAND}`} aria-hidden="true">
            <path className={styles.lineAhead} d={pathD} />
            <path className={styles.lineDone} d={pathD} />
          </svg>
          {stops.map((s) => (
            <span key={s.title} className={styles.node} style={{ left: `${s.x}em`, top: `${s.y}em` }} aria-hidden="true" />
          ))}
          <span className={styles.dot} aria-hidden="true" />
        </div>

        <ol className={styles.stops}>
          {stops.map((s, i) => (
            <li
              key={s.title}
              className={`${styles.card} ${i % 2 ? styles.below : styles.above}`}
              style={{ left: `${s.x - 1.5}em` }}
            >
              <div className={styles.cardText}>
                <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.title}>{s.title}</h3>
                <p className={styles.text}>{s.text}</p>
              </div>
              <ul className={styles.pills}>
                {s.tools.map((t) => {
                  const icon = "icon" in t ? techIcons[t.icon] : undefined;
                  const special = "special" in t;
                  return (
                    <li key={t.name} className={`${styles.pill} ${special ? styles.special : ""}`}>
                      {special && (
                        <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 0c.6 6.4 5 11 12 12-7 1-11.4 5.6-12 12-.6-6.4-5-11-12-12C7 11 11.4 6.4 12 0Z" />
                        </svg>
                      )}
                      {icon && (
                        <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
                          <path d={icon.path} />
                        </svg>
                      )}
                      {t.name}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
