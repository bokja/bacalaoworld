"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/oppskrifter/", label: "Oppskrifter" },
  { href: "/artikler/", label: "Artikler" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-warm-200 bg-white/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl font-bold text-warm-900"
        >
          BacalaoWorld
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-warm-600 transition-colors hover:text-warm-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          aria-label={open ? "Lukk meny" : "Åpne meny"}
        >
          {open ? (
            <X className="h-6 w-6 text-warm-700" />
          ) : (
            <Menu className="h-6 w-6 text-warm-700" />
          )}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="border-t border-warm-200 bg-white px-4 pb-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-medium text-warm-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
