"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

/* ─── Data ────────────────────────────────────────────────────────────── */
const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const contactItems = [
  { icon: Mail,  value: "info@trifactron.com",   href: "mailto:info@trifactron.com" },
  { icon: Phone, value: "+91 484 000 0000",        href: "tel:+914840000000" },
  { icon: MapPin,value: "Kerala, India",           href: null },
  { icon: MapPin,value: "Karlsruhe, Germany",      href: null },
];

/* ─── SVG Icons ───────────────────────────────────────────────────────── */
function LinkedInIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

/* ─── Main Footer ─────────────────────────────────────────────────────── */
export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#06090F" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
      `}</style>

      {/* ── Background grid + glows ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute -top-40 left-1/4 w-[500px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[300px] rounded-full bg-blue-700/4 blur-[100px]" />
      </div>

      {/* ── Top glow rule ───────────────────────────────────────────── */}
      <div
        className="w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,212,255,0.2), rgba(59,130,246,0.15), transparent)",
        }}
      />

      {/* ══ MAIN 3-COLUMN BODY ════════════════════════════════════════ */}
      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-20 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">

          {/* ── COL 1 — Brand + Contact ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-7"
          >
            {/* Wordmark */}
            <div>
              <span
                className="text-2xl sm:text-3xl font-black tracking-tight block mb-1"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  background:
                    "linear-gradient(135deg, #00D4FF 0%, #3B82F6 60%, #818CF8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                TRIFACTRON
              </span>
              <p
                className="text-xs text-slate-500 italic"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Industrial Intelligence. Zero Compromise.
              </p>
            </div>

            {/* Contact list */}
            <ul className="flex flex-col gap-4">
              {contactItems.map((item, i) => {
                const Icon = item.icon;
                const inner = (
                  <li key={i} className="flex items-center gap-3 group">
                    <span
                      className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg"
                      style={{
                        background: "rgba(0,212,255,0.07)",
                        border: "1px solid rgba(0,212,255,0.12)",
                      }}
                    >
                      <Icon size={13} style={{ color: "#00D4FF" }} />
                    </span>
                    <span
                      className="text-sm text-slate-400 group-hover:text-white transition-colors duration-200"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {item.value}
                    </span>
                  </li>
                );
                return item.href ? (
                  <Link href={item.href} key={i}>
                    {inner}
                  </Link>
                ) : (
                  inner
                );
              })}
            </ul>
          </motion.div>

          {/* ── COL 2 — Quick Links ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <p
              className="text-xs font-bold tracking-widest uppercase"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              Quick Links
            </p>
            <ul className="flex flex-col gap-4">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors duration-200"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0 transition-all duration-200 group-hover:w-3"
                      style={{ background: "#00D4FF" }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── COL 3 — Connect With Us ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <p
              className="text-xs font-bold tracking-widest uppercase"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              Connect With Us
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="https://www.linkedin.com/company/trifactron/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 hover:scale-110 hover:border-cyan-500/40"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span className="text-slate-500 group-hover:text-cyan-400 transition-colors duration-200">
                  <LinkedInIcon />
                </span>
              </Link>
              <Link
                href="https://www.instagram.com/tri.factron"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 hover:scale-110 hover:border-cyan-500/40"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span className="text-slate-500 group-hover:text-cyan-400 transition-colors duration-200">
                  <InstagramIcon />
                </span>
              </Link>
            </div>

            {/* Status dot */}
            <div className="mt-2 flex items-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                  style={{ backgroundColor: "#00D4FF" }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: "#00D4FF" }}
                />
              </span>
              <span
                className="text-[10px] font-bold tracking-widest uppercase"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#00D4FF",
                }}
              >
                All Systems Operational
              </span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────────────── */}
      <div
        className="relative border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.35)" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-20 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-xs text-slate-600 text-center sm:text-left"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            &copy; {new Date().getFullYear()} Trifactron. All Rights Reserved.
          </p>
          <p
            className="text-[11px] text-slate-700 text-center sm:text-right"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Designed, Developed &amp; Maintained by{" "}
            <span
              className="font-semibold"
              style={{ color: "rgba(0,212,255,0.45)" }}
            >
              Sathya Enterprises
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}