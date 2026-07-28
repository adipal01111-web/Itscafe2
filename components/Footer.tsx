export default function Footer() {
  return (
    <footer className="relative z-20 border-t border-paper/10 bg-ink px-6 py-16 text-center sm:px-10">
      <h3 className="font-display text-4xl tracking-tightest text-paper sm:text-6xl">
        Come pull yours apart.
      </h3>
      <p className="mx-auto mt-4 max-w-md text-sm text-paper/60">
        118 Ember Lane, open till 2am, most nights later.
      </p>
      <button className="mt-8 rounded-full bg-ember px-8 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-transform hover:scale-105">
        Order Ahead
      </button>
      <p className="mt-16 font-mono text-[11px] uppercase tracking-widest text-smoke">
        © {new Date().getFullYear()} It's Cafe
      </p>
    </footer>
  );
}
