import Link from "next/link";

const navLinks = [
  { href: "/", label: "Catalog" },
  { href: "/tracker", label: "Tracker" },
  { href: "/guide/shopping", label: "Shopping List" },
  { href: "/guide/repotting", label: "Repotting" },
  { href: "/guide/watering", label: "Watering" },
  { href: "/guide/soil", label: "Soil Mixing" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-ink/20">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Link href="/" className="group">
            <h1 className="font-mono text-xs tracking-[0.3em] uppercase text-ink-light">
              Vol. 01
            </h1>
            <p className="mt-1 font-mono text-[11px] tracking-[0.2em] uppercase text-ink-light">
              Plant Care Guide
            </p>
          </Link>
          <nav className="flex flex-wrap gap-x-6 gap-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light hover:text-ink transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
