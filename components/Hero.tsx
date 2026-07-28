"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollStore } from "@/lib/scrollStore";

// Three.js touches window/WebGL — keep it out of the server bundle.
const Scene = dynamic(() => import("./Scene"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Page-load beat: nothing is pinned yet, this just introduces the brand.
      gsap
        .timeline({ delay: 0.15 })
        .from(eyebrowRef.current, { y: 24, opacity: 0, duration: 0.6, ease: "power3.out" })
        .from(
          headlineRef.current,
          { y: 60, opacity: 0, duration: 0.9, ease: "power4.out" },
          "-=0.35"
        )
        .from(tagRef.current, { opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.5");

      // Scroll-driven beat: this section is pinned for 3 viewport heights while
      // the burger deconstructs and the headline recedes to make room for it.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top top",
            end: "+=250%",
            scrub: 1,
            pin: pinRef.current,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;
              // ingredients stay stacked for the first beat, fly apart through
              // the middle, and the whole rig sinks away at the very end so
              // the menu section can take over visually.
              scrollStore.explode = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.12, 0.82, 0, 1, p));
              scrollStore.heroExit = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0.85, 1, 0, 1, p));
            },
          },
        })
        .to(headlineRef.current, { opacity: 0, y: -80, scale: 0.85, ease: "none" }, 0.05)
        .to(eyebrowRef.current, { opacity: 0, y: -20, ease: "none" }, 0)
        .to(subRef.current, { opacity: 1, y: 0, ease: "none" }, 0.18)
        .to(subRef.current, { opacity: 0, y: -20, ease: "none" }, 0.75)
        .to(tagRef.current, { opacity: 0, ease: "none" }, 0.85);
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        {/* giant wordmark sits behind the 3D canvas, bleeding off the edges */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="select-none font-display text-[22vw] leading-none tracking-tightest text-stroke opacity-[0.07]">
            ITS
          </span>
        </div>

        <div className="absolute inset-0">
          <Scene />
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p
            ref={eyebrowRef}
            className="mb-4 font-mono text-xs uppercase tracking-widest text-pickle"
          >
            Open Till Late — Est. Nowhere Else
          </p>

          <h1
            ref={headlineRef}
            className="font-display text-[13vw] leading-[0.85] tracking-tightest text-paper sm:text-[9vw]"
          >
            IT'S CAFE
          </h1>

          <p
            ref={subRef}
            className="absolute mt-4 max-w-md translate-y-6 font-body text-lg text-paper/80 opacity-0"
          >
            Every layer, built to be pulled apart. Scroll to watch the stack
            come undone.
          </p>

          <div
            ref={tagRef}
            className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-2 font-mono text-xs uppercase tracking-widest text-smoke"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
            Scroll to deconstruct
          </div>
        </div>
      </div>
    </div>
  );
}
