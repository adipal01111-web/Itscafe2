"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MealBox, { Meal } from "./MealBox";

gsap.registerPlugin(ScrollTrigger);

const MEALS: Meal[] = [
  {
    id: "stack",
    name: "The Full Stack",
    desc: "Double patty, aged cheddar, pickled onion, ember sauce. The one on every poster.",
    price: "$14",
    tag: "Signature",
    accent: "ember",
  },
  {
    id: "smash",
    name: "Late Night Smash",
    desc: "Thin-smashed patty, American cheese, shredded lettuce, griddled bun.",
    price: "$11",
    tag: "Cult Classic",
    accent: "pickle",
  },
  {
    id: "garden",
    name: "No Meat, No Problem",
    desc: "Charred mushroom, tomato jam, smoked gouda, crispy shallots.",
    price: "$12",
    tag: "Plant-Led",
    accent: "pickle",
  },
  {
    id: "box",
    name: "It's Cafe Box",
    desc: "Any signature, side of fries, drip coffee. Built for the counter, not the table.",
    price: "$19",
    tag: "Meal Box",
    accent: "ember",
  },
  {
    id: "brew",
    name: "Black & Slow",
    desc: "12-hour cold brew, cut short with oat milk if you want it.",
    price: "$6",
    tag: "Coffee",
    accent: "pickle",
  },
  {
    id: "side",
    name: "Fries, Obviously",
    desc: "Double-fried, ember-dusted, gone before the burger.",
    price: "$5",
    tag: "Side",
    accent: "ember",
  },
];

export default function MenuSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      const cards = gsap.utils.toArray<HTMLElement>(".meal-card", gridRef.current);
      gsap.from(cards, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="relative z-20 bg-ink px-6 py-28 sm:px-10"
    >
      {/* faint radial warmth so the menu doesn't feel like a flat void after the 3D scene */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-ember/10 to-transparent" />

      <div ref={headingRef} className="mx-auto mb-16 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-ember">
          The Menu — No Substitutions, Sorry
        </p>
        <h2 className="mt-4 font-display text-5xl leading-[0.9] tracking-tightest text-paper sm:text-7xl">
          Same stack.
          <br />
          Different rules.
        </h2>
      </div>

      <div
        ref={gridRef}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {MEALS.map((meal) => (
          <MealBox key={meal.id} meal={meal} />
        ))}
      </div>
    </section>
  );
}
