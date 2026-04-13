"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Catalog" },
  { href: "/tracker", label: "Tracker" },
  { href: "/guide/shopping", label: "Shopping List" },
  { href: "/guide/repotting", label: "Repotting" },
  { href: "/guide/watering", label: "Watering" },
  { href: "/guide/soil", label: "Soil Mixing" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-ink/20">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:py-6 sm:px-6">
        <div className="flex items-center justify-between sm:items-end">
          <Link href="/" className="group">
            <h1 className="font-mono text-xs tracking-[0.3em] uppercase text-ink-light">
              Vol. 01
            </h1>
            <p className="mt-1 font-mono text-[11px] tracking-[0.2em] uppercase text-ink-light">
              Plant Care Guide
            </p>
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden p-1 text-ink-light hover:text-ink transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <nav className="hidden sm:flex flex-wrap gap-x-6 gap-y-1">
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

        {open && (
          <nav className="mt-4 flex flex-col gap-3 border-t border-ink/10 pt-4 sm:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light hover:text-ink transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
