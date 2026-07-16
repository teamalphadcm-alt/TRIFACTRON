"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-[#030712]/90 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/LOGO.jpeg"
            alt="Trifactron logo"
            width={44}
            height={44}
            className="rounded-md object-contain"
            priority
          />
          <span className="text-3xl font-bold tracking-wide">
            <span className="text-white">TRI</span>
            <span className="text-cyan-400">FACTRON</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-300 hover:text-cyan-400 transition"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#030712] border-t border-white/10">
          {links.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-4 border-b border-white/5 hover:bg-white/5"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}