"use client";

import { useRef } from "react";
import gsap from "gsap";

export type Meal = {
  id: string;
  name: string;
  desc: string;
  price: string;
  tag: string;
  accent: "ember" | "pickle";
};

export default function MealBox({ meal }: { meal: Meal }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateX: y * -8,
      rotateY: x * 8,
      scale: 1.04,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
    });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const accentClass = meal.accent === "ember" ? "text-ember" : "text-pickle";
  const ringClass = meal.accent === "ember" ? "group-hover:ring-ember/50" : "group-hover:ring-pickle/50";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`meal-card group relative flex h-full flex-col justify-between rounded-2xl border border-paper/10 bg-paper/5 p-6 backdrop-blur-md ring-1 ring-transparent transition-shadow duration-300 ${ringClass}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div>
        <span className={`font-mono text-[11px] uppercase tracking-widest ${accentClass}`}>
          {meal.tag}
        </span>
        <h3 className="mt-3 font-display text-3xl leading-none tracking-tight text-paper">
          {meal.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-paper/60">{meal.desc}</p>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-paper/10 pt-4">
        <span className="font-mono text-lg text-paper">{meal.price}</span>
        <button
          className={`rounded-full border border-paper/20 px-4 py-1.5 text-xs uppercase tracking-widest text-paper/80 transition-colors hover:border-paper/60 hover:text-paper`}
        >
          Add
        </button>
      </div>
    </div>
  );
}
