export function SiteFooter() {
  return (
    <footer className="border-t border-ink/20 mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-light">
          April 2026
        </p>
        <a
          href="https://skg.gg"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] tracking-[0.15em] text-ink-light hover:text-ink transition-colors"
        >
          built by skg
        </a>
      </div>
    </footer>
  );
}
