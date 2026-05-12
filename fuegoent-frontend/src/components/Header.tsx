"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchIcon, UserIcon, CartIcon, MenuIcon, XIcon } from "./icons";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/collections" },
  { label: "Booth Inquiry", href: "/pages/booth-inquiry" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? "bg-black/95 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="font-[family-name:var(--font-display)] text-xl md:text-2xl tracking-widest text-white hover:text-orange-400 transition-colors"
            >
              FUEGO ENTERTAINMENT
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm tracking-wider uppercase transition-colors hover:text-orange-400 ${
                    pathname === item.href ? "text-orange-400" : "text-white/80"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-4">
              <button
                aria-label="Search"
                className="hidden md:flex text-white/70 hover:text-white transition-colors"
              >
                <SearchIcon size={18} />
              </button>
              <button
                aria-label="Account"
                className="hidden md:flex text-white/70 hover:text-white transition-colors"
              >
                <UserIcon size={18} />
              </button>
              <button
                aria-label="Cart"
                className="flex items-center gap-1 text-white/70 hover:text-white transition-colors"
              >
                <CartIcon size={18} />
                <span className="text-xs">0</span>
              </button>
              {/* Mobile menu toggle */}
              <button
                aria-label="Menu"
                className="md:hidden text-white"
                onClick={() => setMenuOpen((v) => !v)}
              >
                {menuOpen ? <XIcon size={22} /> : <MenuIcon size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/98 flex flex-col pt-20">
          <nav className="flex flex-col px-8 py-6 gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-[family-name:var(--font-display)] text-4xl tracking-widest text-white hover:text-orange-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="px-8 pt-6 border-t border-white/10 flex gap-6">
            <button className="text-white/60 hover:text-white flex items-center gap-2 text-sm tracking-wider">
              <SearchIcon size={16} /> Search
            </button>
            <button className="text-white/60 hover:text-white flex items-center gap-2 text-sm tracking-wider">
              <UserIcon size={16} /> Account
            </button>
          </div>
        </div>
      )}
    </>
  );
}
