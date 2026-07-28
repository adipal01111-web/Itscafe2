npm install
npm run dev
Design plan (why it looks this way)
Palette — near-black ink (#12100E) instead of the usual cream background, warm paper white for text, ember coral-orange as the hot accent, pickle acid-lime as the secondary/kinetic accent. Reads like a chalk menu board at night, not a bakery mood board.
Type — Anton (condensed poster grotesque) for display, Inter for body, JetBrains Mono for prices/labels/eyebrows — the mono face is doing the "receipt printer" job a numbered list would normally do.
Signature element — the burger itself is the hero. No stat blocks, no gradient-and-headline template: the wordmark is a huge ghost outline behind the 3D model, and the model is the thing that actually moves.
Structure
app/
  layout.tsx        Fonts, <SmoothScroll> wrapper, global grain overlay
  page.tsx           Hero -> MenuSection -> Footer
  globals.css        Tailwind layers + grain texture + reduced-motion guard
components/
  SmoothScroll.tsx    Lenis instance, synced to gsap.ticker + ScrollTrigger
  Hero.tsx            Pinned scroll section; drives explode/heroExit progress
  Scene.tsx           R3F <Canvas>, lighting, environment
  BurgerModel.tsx     6 procedural layers, lerp from rest -> exploded position
  MenuSection.tsx     Scroll-revealed grid of MealBox cards
  MealBox.tsx         Glassmorphic card, mouse-tilt on hover via GSAP
  Footer.tsx          Closing CTA
lib/
  scrollStore.ts      Plain mutable object bridging GSAP -> useFrame
How the 3D deconstruction works
Hero.tsx pins itself for 250% of the viewport height with a single ScrollTrigger (scrub: 1).
On every scrub tick, onUpdate remaps scroll progress into two 0-1 values written to scrollStore (explode, heroExit) — no React state, so nothing outside the Canvas re-renders.
Inside BurgerModel.tsx, each layer mesh reads scrollStore.explode every frame in useFrame and lerps from its rest position to its exploded position, with a per-layer spin axis so the break-apart looks organic instead of six objects sliding on the same rail.
The same timeline scrubs the headline/eyebrow/subhead opacity and position so the typography recedes exactly as the burger takes over, then hands off into MenuSection.
Swapping in a real 3D model
Replace the primitive meshes in BurgerModel.tsx with useGLTF from @react-three/drei, keeping one mesh per ingredient so each can still get its own ref, rest position and exploded offset:
const { nodes } = useGLTF("/models/burger.glb");
// <mesh ref={ref} geometry={nodes.PattyLayer.geometry} ... />
Accessibility / performance notes already baked in
prefers-reduced-motion disables animation durations globally.
Lenis + GSAP ticker are unified so there's one source of truth for scroll position (no jitter between smooth-scroll and ScrollTrigger).
Scene is loaded via next/dynamic with ssr: false since Three.js needs window/WebGL and would otherwise break the server render.
