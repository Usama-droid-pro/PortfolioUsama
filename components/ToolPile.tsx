"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type * as MatterNS from "matter-js";
import { ScrollTrigger, gsap, prefersReducedMotion } from "@/lib/gsap";
import { toolbox } from "@/data/profile";
import { techIcons as icons } from "@/lib/techIcons";
import styles from "./ToolPile.module.css";

const tones = ["butter", "paper", "lilac", "ink"] as const;

// How hard a change in scroll speed kicks the pile (px/frame of velocity
// change -> body velocity). Braking spreads over several frames and the kicks
// add up, so upward speed is capped too: a hop tops out around 180px.
const JOLT = 0.5;
const JOLT_MAX = 8;
const HOP_MAX = 11;

type Matter = typeof MatterNS;
type FilterId = (typeof toolbox.filters)[number]["id"];
type Pile = { stop: () => void; show: (indices: number[]) => void };

// "All" shows every tool but only one special chip (the one tagged "all").
const indicesFor = (f: FilterId) =>
  toolbox.tools.flatMap((t, i) => {
    const cats = t.cats as readonly string[];
    const on = f === "all" ? !("special" in t) || cats.includes("all") : cats.includes(f);
    return on ? [i] : [];
  });

// Fewer pills get bigger so a filtered pile still fills the box.
const scaleFor = (count: number) => gsap.utils.clamp(0.72, 1.25, Math.sqrt(20 / count));

export default function ToolPile() {
  const boxRef = useRef<HTMLDivElement>(null);
  const pileRef = useRef<HTMLUListElement>(null);
  const pile = useRef<Pile | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterId>("all");
  const active = useMemo(() => indicesFor(filter), [filter]);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    if (prefersReducedMotion()) return; // static wrapped list
    let cancelled = false;
    Promise.all([import("matter-js"), document.fonts.ready]).then(([mod]) => {
      if (!cancelled) pile.current = run(mod.default as Matter, boxRef.current!, pileRef.current!, setNote, () => activeRef.current);
    });
    return () => {
      cancelled = true;
      pile.current?.stop();
      pile.current = null;
    };
  }, []);

  const choose = (f: FilterId) => {
    if (f === filter) return;
    setFilter(f);
    setNote(null);
    pile.current?.show(indicesFor(f));
  };

  return (
    <section id="stack" className={styles.tools}>
      <div className={styles.head}>
        <h2 className={styles.heading}>{toolbox.heading}</h2>
        <p className={styles.hint}>{toolbox.hint}</p>
      </div>

      <div className={styles.filters} role="group" aria-label="Filter tools by layer">
        {toolbox.filters.map((f) => (
          <button
            key={f.id}
            type="button"
            className={styles.filter}
            aria-pressed={filter === f.id}
            onClick={() => choose(f.id)}
          >
            {f.label}
            <span className={styles.count}>{indicesFor(f.id).length}</span>
          </button>
        ))}
      </div>

      <div ref={boxRef} className={styles.box}>
        <ul ref={pileRef} className={styles.pile}>
          {toolbox.tools.map((t, i) => {
            const icon = "icon" in t ? icons[t.icon] : undefined;
            const special = "special" in t;
            const tone = special ? styles.special : styles[tones[i % tones.length]];
            return (
              <li
                key={t.name}
                className={`${styles.pill} ${tone} ${"big" in t ? styles.big : ""}`}
                data-off={active.includes(i) ? undefined : ""}
                onPointerEnter={() => setNote(t.note)}
                onPointerLeave={() => setNote(null)}
              >
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
                <span className="sr-only">: {t.note}</span>
              </li>
            );
          })}
        </ul>

        <p className={styles.note} aria-hidden="true">
          {note ?? (
            <>
              <span className={styles.ifHover}>Hover</span>
              <span className={styles.ifTouch}>Tap</span> a tool to see what I use it for.
            </>
          )}
        </p>
      </div>
    </section>
  );
}

// Physics: pills are DOM nodes; Matter only moves them. A body exists only
// while its pill is in the pile; switching filters clears the pile and drops
// the new set from above.
function run(
  M: Matter,
  box: HTMLDivElement,
  pile: HTMLUListElement,
  setNote: (n: string | null) => void,
  wanted: () => number[]
): Pile {
  const { Engine, Bodies, Body, Composite, Constraint } = M;
  const els = Array.from(pile.children) as HTMLElement[];

  box.classList.add(styles.live);
  const engine = Engine.create({ gravity: { x: 0, y: 1.2 } });
  engine.positionIterations = 10;

  let W = box.clientWidth;
  let H = box.clientHeight;
  let walls: MatterNS.Body[] = [];
  const T = 400; // wall thickness; thick so fast throws can't tunnel through

  const buildWalls = () => {
    if (walls.length) Composite.remove(engine.world, walls);
    const tall = H * 4;
    walls = [
      Bodies.rectangle(W / 2, H + T / 2, W + T * 2, T, { isStatic: true }), // floor
      Bodies.rectangle(-T / 2, H - tall / 2, T, tall, { isStatic: true }), // left
      Bodies.rectangle(W + T / 2, H - tall / 2, T, tall, { isStatic: true }), // right
      Bodies.rectangle(W / 2, H - tall - T / 2, W + T * 2, T, { isStatic: true }), // lid, far above
    ];
    Composite.add(engine.world, walls);
  };
  buildWalls();

  const bodies: (MatterNS.Body | null)[] = els.map(() => null);
  const sizes = els.map(() => ({ w: 0, h: 0 }));
  let shown: number[] = []; // indices currently in the pile
  let dropped = false; // first drop waits for the scroll trigger

  const placeAbove = (b: MatterNS.Body, i: number) => {
    const { w, h } = sizes[i];
    Body.setPosition(b, { x: w / 2 + Math.random() * Math.max(1, W - w), y: -h - Math.random() * H * 0.6 });
    Body.setAngle(b, (Math.random() - 0.5) * 1.2);
    Body.setVelocity(b, { x: 0, y: 0 });
  };

  // ---- Drag & throw with pointer events (keeps page scroll on touch) ----
  let grab: { c: MatterNS.Constraint; el: HTMLElement; id: number } | null = null;
  const release = () => {
    if (!grab) return;
    Composite.remove(engine.world, grab.c);
    grab.el.classList.remove(styles.grabbed);
    grab = null;
  };

  // ---- Fill / clear the pile ----
  let calls: gsap.core.Tween[] = [];
  let leaving: gsap.core.Tween | null = null;

  const clear = () => {
    release();
    shown.forEach((i) => {
      const b = bodies[i];
      if (b) Composite.remove(engine.world, b);
      bodies[i] = null;
      els[i].style.visibility = "hidden";
      gsap.set(els[i], { clearProps: "opacity,--s" });
    });
    shown = [];
  };

  const dropIn = (indices: number[]) => {
    pile.style.setProperty("--scale", String(scaleFor(indices.length)));
    shown = indices;
    const step = Math.min(0.07, 2.2 / indices.length);
    calls = indices.map((i, n) =>
      gsap.delayedCall(n * step, () => {
        const el = els[i];
        sizes[i] = { w: el.offsetWidth, h: el.offsetHeight };
        const b = Bodies.rectangle(0, 0, sizes[i].w, sizes[i].h, {
          chamfer: { radius: sizes[i].h / 2 },
          restitution: 0.3,
          friction: 0.35,
          frictionAir: 0.012,
          density: 0.002,
        });
        placeAbove(b, i);
        bodies[i] = b;
        Composite.add(engine.world, b);
        el.style.visibility = "visible";
      })
    );
  };

  const show = (indices: number[]) => {
    if (!dropped) return; // the scroll trigger will drop whatever is wanted then
    calls.forEach((c) => c.kill());
    calls = [];
    if (leaving) {
      // Clicked again mid-vanish: finish the clear at once.
      leaving.kill();
      leaving = null;
      clear();
    }
    const out = shown.filter((i) => bodies[i]).map((i) => els[i]);
    if (!out.length) {
      clear();
      dropIn(indices);
      return;
    }
    leaving = gsap.to(out, {
      "--s": 0,
      opacity: 0,
      duration: 0.3,
      stagger: { amount: 0.25, from: "random" },
      ease: "back.in(2)",
      onComplete: () => {
        leaving = null;
        clear();
        dropIn(indices);
      },
    });
  };

  const local = (e: PointerEvent) => {
    const r = box.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const onDown = (e: PointerEvent) => {
    const el = e.currentTarget as HTMLElement;
    const i = els.indexOf(el);
    const b = bodies[i];
    if (!b || leaving) return;
    e.preventDefault();
    el.setPointerCapture(e.pointerId);
    const p = local(e);
    const c = Constraint.create({
      pointA: p,
      bodyB: b,
      pointB: { x: p.x - b.position.x, y: p.y - b.position.y },
      stiffness: 0.18,
      damping: 0.08,
      length: 0,
    });
    Composite.add(engine.world, c);
    grab = { c, el, id: e.pointerId };
    el.classList.add(styles.grabbed);
    setNote(toolbox.tools[i].note);
  };
  const onMove = (e: PointerEvent) => {
    if (grab && e.pointerId === grab.id) grab.c.pointA = local(e);
  };
  const onUp = (e: PointerEvent) => {
    if (grab && e.pointerId === grab.id) release();
  };
  els.forEach((el) => {
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
  });

  // ---- Tick: step physics, react to scroll speed, write transforms ----
  let active = false;
  let lastV = 0;
  const tick = (_t: number, dt: number) => {
    if (!active) return;

    // Scroll jolt: when the page speeds up or brakes, the pile lags behind
    // like loose things in a box. Braking after a fast scroll throws them up.
    const v = window.appLenis?.velocity ?? 0;
    const dv = v - lastV;
    lastV = v;
    if (Math.abs(dv) > 0.25) {
      const kick = gsap.utils.clamp(-JOLT_MAX, JOLT_MAX, dv * JOLT);
      shown.forEach((i) => {
        const b = bodies[i];
        if (!b) return;
        Body.setVelocity(b, {
          x: b.velocity.x + (Math.random() - 0.5) * Math.abs(kick) * 0.4,
          y: Math.max(-HOP_MAX, b.velocity.y + kick),
        });
        Body.setAngularVelocity(b, b.angularVelocity + (Math.random() - 0.5) * Math.abs(kick) * 0.004);
      });
    }

    Engine.update(engine, Math.min(dt, 33));

    shown.forEach((i) => {
      const b = bodies[i];
      if (!b) return;
      const { x, y } = b.position;
      if (y > H + 300 || x < -300 || x > W + 300) placeAbove(b, i); // escaped: drop it again
      const { w, h } = sizes[i];
      els[i].style.transform = `translate3d(${x - w / 2}px, ${y - h / 2}px, 0) rotate(${b.angle}rad)`;
    });
  };
  gsap.ticker.add(tick);

  // ---- Scroll hooks. Refresh after earlier pins (About) so positions include their spacing. ----
  const inView = ScrollTrigger.create({
    trigger: box,
    start: "top bottom",
    end: "bottom top",
    refreshPriority: -1,
    onToggle: (self) => {
      active = self.isActive;
      lastV = window.appLenis?.velocity ?? 0;
    },
  });
  const dropper = ScrollTrigger.create({
    trigger: box,
    start: "top 75%",
    once: true,
    refreshPriority: -1,
    onEnter: () => {
      dropped = true;
      dropIn(wanted());
    },
  });
  ScrollTrigger.refresh();

  // ---- Resize: rebuild walls and scale pills with the fluid em sizing ----
  const ro = new ResizeObserver(() => {
    const nw = box.clientWidth;
    const nh = box.clientHeight;
    if (nw === W && nh === H) return;
    W = nw;
    H = nh;
    buildWalls();
    shown.forEach((i) => {
      const b = bodies[i];
      if (!b) return;
      const w = els[i].offsetWidth;
      const h = els[i].offsetHeight;
      if (w && (w !== sizes[i].w || h !== sizes[i].h)) {
        Body.scale(b, w / sizes[i].w, h / sizes[i].h);
        sizes[i] = { w, h };
      }
      Body.setPosition(b, { x: gsap.utils.clamp(w / 2, W - w / 2, b.position.x), y: Math.min(b.position.y, H - h / 2) });
    });
  });
  ro.observe(box);

  const stop = () => {
    gsap.ticker.remove(tick);
    inView.kill();
    dropper.kill();
    ro.disconnect();
    calls.forEach((c) => c.kill());
    leaving?.kill();
    els.forEach((el) => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.style.transform = "";
      el.style.visibility = "";
      gsap.set(el, { clearProps: "opacity,--s" });
    });
    Engine.clear(engine);
    box.classList.remove(styles.live);
  };

  return { stop, show };
}
