// GSAP's ScrollTrigger callbacks fire outside React's render cycle, and we
// don't want a setState-per-scroll-pixel re-rendering the whole R3F tree.
// Instead GSAP writes into this plain object every tick, and the Three.js
// useFrame loop reads it directly each frame — same pattern as driving a
// shader uniform from scroll.
export const scrollStore = {
  /** 0 -> resting burger, 1 -> fully deconstructed */
  explode: 0,
  /** 0 -> hero framing, 1 -> handed off to the menu section */
  heroExit: 0,
};
