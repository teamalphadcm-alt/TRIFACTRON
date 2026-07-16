"use client";

import { useState, useEffect, useRef, ReactNode, CSSProperties, FormEvent } from "react";

// ─── Constants ───────────────────────────────────────────────────────────────

const CYAN = "#22d3ee";
const BLUE = "#3b82f6";

// WhatsApp number (Germany office) — country code + number, digits only, no +/spaces
const WHATSAPP_NUMBER = "4915511049025";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Office {
  flagComponent: ReactNode;
  country: string;
  city: string;
  address: string;
  email: string;
  phone: string;
  accent: string;
}

interface Stat {
  icon: string;
  label: string;
  value: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: boolean;
  email?: boolean;
  message?: boolean;
}

// ─── Data ────────────────────────────────────────────────────────────────────

// ─── Flag SVGs ───────────────────────────────────────────────────────────────

function IndiaFlag() {
  return (
    <svg width="44" height="30" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 4, flexShrink: 0, display: "block" }}>
      <rect width="900" height="200" y="0"   fill="#FF9933" />
      <rect width="900" height="200" y="200" fill="#FFFFFF" />
      <rect width="900" height="200" y="400" fill="#138808" />
      {/* Ashoka Chakra */}
      <circle cx="450" cy="300" r="85" fill="none" stroke="#000080" strokeWidth="7" />
      <circle cx="450" cy="300" r="12" fill="#000080" />
      {Array.from({ length: 24 }, (_, i) => {
        const angle = (i * 360) / 24;
        const rad   = (angle * Math.PI) / 180;
        const x1    = 450 + 12  * Math.cos(rad);
        const y1    = 300 + 12  * Math.sin(rad);
        const x2    = 450 + 85  * Math.cos(rad);
        const y2    = 300 + 85  * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#000080" strokeWidth="4" />;
      })}
    </svg>
  );
}

function GermanyFlag() {
  return (
    <svg width="44" height="30" viewBox="0 0 5 3" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 4, flexShrink: 0, display: "block" }}>
      <rect width="5" height="1" y="0" fill="#000000" />
      <rect width="5" height="1" y="1" fill="#DD0000" />
      <rect width="5" height="1" y="2" fill="#FFCE00" />
    </svg>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

const OFFICES: Office[] = [
  {
    flagComponent: <IndiaFlag />,
    country: "India",
    city: "Shoranur, Kerala",
    address: "Kulapully, Shoranur, Kerala 679 121",
    email: "info@trifactron.com",
    phone: "+91 89439 58370",
    accent: "rgba(34,211,238,0.12)",
  },
  {
    flagComponent: <GermanyFlag />,
    country: "Germany",
    city: "Karlsruhe",
    address: "Elsa-Brändström-Str. 15, 76137 Karlsruhe",
    email: "info@trifactron.com",
    phone: "+49 15511 049025",
    accent: "rgba(59,130,246,0.12)",
  },
];

const STATS: Stat[] = [
  { icon: "👥", label: "Clients",      value: "10+"       },
  { icon: "🏭", label: "Industry 4.0", value: "Certified" },
  { icon: "🌍", label: "Countries",    value: "2"         },
  { icon: "⚡", label: "Uptime SLA",   value: "99.9%"     },
];

const FAQ: FaqItem[] = [
  { q: "Deployment time",   a: "On-time delivery" },
  { q: "PLC compatibility", a: "Full integration" },
  { q: "Team training",     a: "Included"        },
  { q: "Annual support",    a: "Available"       },
];

// ─── Shared styles ───────────────────────────────────────────────────────────

const GLASS: CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 24,
};

const INPUT_BASE: CSSProperties = {
  width: "100%",
  height: 52,
  borderRadius: 14,
  border: "1.5px solid rgba(255,255,255,0.1)",
  background: "rgba(15,23,42,0.7)",
  color: "#f1f5f9",
  padding: "0 18px",
  fontSize: 15,
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useInView(ref: React.RefObject<HTMLElement>): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return inView;
}

// ─── Primitives ──────────────────────────────────────────────────────────────

type FadeDirection = "up" | "left" | "right" | "scale";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: FadeDirection;
  className?: string;
}

function FadeIn({ children, delay = 0, direction = "up", className = "" }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref as React.RefObject<HTMLElement>);

  const transform = visible
    ? "none"
    : direction === "up"    ? "translateY(40px)"
    : direction === "left"  ? "translateX(-40px)"
    : direction === "right" ? "translateX(40px)"
    : "scale(0.92)";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform,
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

interface TagProps {
  children: ReactNode;
}

function Tag({ children }: TagProps) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 14px",
        borderRadius: 999,
        border: "1px solid rgba(34,211,238,0.3)",
        background: "rgba(34,211,238,0.08)",
        color: CYAN,
        fontSize: 13,
        fontWeight: 500,
        marginBottom: 24,
      }}
    >
      {children}
    </div>
  );
}

// ─── Icons ───────────────────────────────────────────────────────────────────

interface ArrowIconProps {
  hovered: boolean;
}

function ArrowIcon({ hovered }: ArrowIconProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      style={{ transform: hovered ? "translateX(4px)" : "none", transition: "transform 0.2s" }}
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      style={{ animation: "spin 0.8s linear infinite" }}
    >
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}

// ─── Form Components ─────────────────────────────────────────────────────────

interface FloatingInputProps {
  type?: string;
  placeholder?: string;
  icon?: string;
  value: string;
  onChange: (val: string) => void;
  multiline?: boolean;
  rows?: number;
}

function FloatingInput({
  type = "text",
  placeholder,
  icon,
  value,
  onChange,
  multiline = false,
  rows = 4,
}: FloatingInputProps) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const active = focused || hovered;

  const borderColor = focused
    ? CYAN
    : active
    ? "rgba(34,211,238,0.4)"
    : "rgba(255,255,255,0.1)";

  const boxShadow = focused ? "0 0 0 3px rgba(34,211,238,0.12)" : "none";

  const textareaStyle: CSSProperties = {
    ...INPUT_BASE,
    height: "auto",
    minHeight: rows * 22 + 28,
    padding: "14px 18px",
    resize: "none",
    lineHeight: "1.6",
    borderColor,
    boxShadow,
  };

  const inputStyle: CSSProperties = {
    ...INPUT_BASE,
    paddingLeft: icon ? 46 : 18,
    borderColor,
    boxShadow,
  };

  const handlers = {
    onFocus:      () => setFocused(true),
    onBlur:       () => setFocused(false),
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {icon && !multiline && (
        <span
          style={{
            position: "absolute",
            left: 15,
            top: "50%",
            transform: "translateY(-50%)",
            color: focused ? CYAN : "rgba(148,163,184,0.6)",
            fontSize: 16,
            pointerEvents: "none",
            transition: "color 0.2s",
          }}
        >
          {icon}
        </span>
      )}
      {multiline ? (
        <textarea
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={textareaStyle}
          {...handlers}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={inputStyle}
          {...handlers}
        />
      )}
    </div>
  );
}

interface SubmitButtonProps {
  label?: string;
  loading: boolean;
  sent: boolean;
}

function SubmitButton({ label = "Send message", loading, sent }: SubmitButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="submit"
      disabled={loading || sent}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        height: 54,
        borderRadius: 14,
        border: "none",
        background: sent
          ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
          : `linear-gradient(135deg, ${CYAN} 0%, #0ea5e9 50%, ${BLUE} 100%)`,
        color: "#fff",
        fontSize: 16,
        fontWeight: 700,
        cursor: sent ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        transition: "transform 0.2s, box-shadow 0.2s, filter 0.2s",
        transform: hovered && !sent ? "translateY(-2px)" : "none",
        boxShadow: hovered && !sent
          ? "0 12px 40px rgba(34,211,238,0.35)"
          : "0 4px 20px rgba(34,211,238,0.2)",
        filter: loading ? "brightness(0.85)" : "none",
        letterSpacing: 0.3,
        fontFamily: "inherit",
      }}
    >
      {sent ? (
        <><span style={{ fontSize: 18 }}>✓</span> Message sent!</>
      ) : loading ? (
        <><SpinnerIcon /> Sending…</>
      ) : (
        <>{label} <ArrowIcon hovered={hovered} /></>
      )}
    </button>
  );
}

// ─── Info Panel Components ────────────────────────────────────────────────────

interface OfficeCardProps {
  office: Office;
  index: number;
}

function OfficeCard({ office, index }: OfficeCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <FadeIn delay={index * 120}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          gap: 18,
          padding: "22px 24px",
          borderRadius: 18,
          background: hovered ? "rgba(30,41,59,0.9)" : "rgba(15,23,42,0.6)",
          border: `1px solid ${hovered ? "rgba(34,211,238,0.25)" : "rgba(255,255,255,0.07)"}`,
          transform: hovered ? "translateY(-2px)" : "none",
          transition: "all 0.25s ease",
          cursor: "default",
        }}
      >
        <div style={{ flexShrink: 0, paddingTop: 2 }}>
          {office.flagComponent}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: "#f1f5f9", marginBottom: 6 }}>
            {office.country} Office
          </div>
          <div style={{ fontSize: 13.5, color: "rgba(148,163,184,0.85)", lineHeight: 1.7 }}>
            <div>{office.address}</div>
            <div style={{ color: hovered ? CYAN : "rgba(148,163,184,0.85)", transition: "color 0.2s" }}>
              {office.email}
            </div>
            <div>{office.phone}</div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

interface StatPillProps extends Stat {
  index: number;
}

function StatPill({ icon, label, value, index }: StatPillProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <FadeIn delay={index * 80}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          height: 90,
          borderRadius: 16,
          background: hovered ? "rgba(30,41,59,0.9)" : "rgba(15,23,42,0.5)",
          border: `1px solid ${hovered ? "rgba(34,211,238,0.3)" : "rgba(255,255,255,0.06)"}`,
          transform: hovered ? "translateY(-3px) scale(1.04)" : "none",
          transition: "all 0.25s ease",
          cursor: "default",
        }}
      >
        <div style={{ fontSize: 20 }}>{icon}</div>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: hovered ? CYAN : "#cbd5e1", transition: "color 0.2s" }}>
          {value}
        </div>
        <div style={{ fontSize: 11.5, color: "rgba(148,163,184,0.6)" }}>{label}</div>
      </div>
    </FadeIn>
  );
}

interface FAQCardProps extends FaqItem {
  index: number;
}

function FAQCard({ q, a, index }: FAQCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <FadeIn delay={600 + index * 80}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: "20px 22px",
          borderRadius: 18,
          background: hovered ? "rgba(30,41,59,0.7)" : "rgba(255,255,255,0.03)",
          border: `1px solid ${hovered ? "rgba(34,211,238,0.3)" : "rgba(255,255,255,0.07)"}`,
          transform: hovered ? "translateY(-3px)" : "none",
          transition: "all 0.25s ease",
          cursor: "default",
        }}
      >
        <div style={{ fontSize: 13, color: "rgba(148,163,184,0.7)", marginBottom: 6 }}>{q}</div>
        <div style={{ fontSize: 15.5, fontWeight: 700, color: hovered ? CYAN : "#e2e8f0", transition: "color 0.2s" }}>
          {a}
        </div>
      </div>
    </FadeIn>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "", email: "", phone: "", company: "", message: "",
  });
  const [sending, setSending]   = useState(false);
  const [sent, setSent]         = useState(false);
  const [errors, setErrors]     = useState<FormErrors>({});

  const set = (key: keyof FormState) => (val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = true;
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = true;
    if (!form.message.trim()) e.message = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);

    const lines = [
      `New contact form submission:`,
      ``,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : null,
      form.company ? `Company: ${form.company}` : null,
      ``,
      `Message: ${form.message}`,
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

    setTimeout(() => {
      setSending(false);
      setSent(true);
      window.open(waUrl, "_blank");
    }, 800);
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "linear-gradient(170deg, #020617 0%, #0f172a 50%, #020617 100%)",
        padding: "80px 0",
        position: "relative",
        overflow: "hidden",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ── Background decoration ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: 80, left: "5%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: 80, right: "5%", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", top: "40%", left: "40%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)", transform: "translate(-50%,-50%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "52px 52px" }} />
      </div>

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>

        {/* ── Hero grid: form + info panel ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 520px), 1fr))",
            gap: "48px 64px",
            alignItems: "start",
          }}
        >
          {/* LEFT — Contact form */}
          <FadeIn direction="up">
            <Tag>✦ Contact Us · Let's Connect</Tag>

            <h1
              style={{
                fontSize: "clamp(42px, 6vw, 76px)",
                fontWeight: 900,
                lineHeight: 1.04,
                margin: "0 0 20px",
                color: "#f1f5f9",
                letterSpacing: "-1.5px",
              }}
            >
              Get In{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${CYAN} 0%, #38bdf8 50%, ${BLUE} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Touch
              </span>
            </h1>

            <p
              style={{
                fontSize: 17,
                color: "rgba(148,163,184,0.9)",
                lineHeight: 1.75,
                marginBottom: 36,
                maxWidth: 480,
              }}
            >
              Ready to transform your factory with AI, predictive maintenance, and industrial
              automation? Our engineers are ready to help.
            </p>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              {/* Row 1 */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
                <div>
                  <FloatingInput placeholder="Full name *" icon="👤" value={form.name} onChange={set("name")} />
                  {errors.name && <div style={{ color: "#f87171", fontSize: 12, marginTop: 4, marginLeft: 4 }}>Required</div>}
                </div>
                <div>
                  <FloatingInput type="email" placeholder="Email address *" icon="✉️" value={form.email} onChange={set("email")} />
                  {errors.email && <div style={{ color: "#f87171", fontSize: 12, marginTop: 4, marginLeft: 4 }}>Valid email required</div>}
                </div>
              </div>

              {/* Row 2 */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
                <FloatingInput type="tel" placeholder="Phone number" icon="📞" value={form.phone} onChange={set("phone")} />
                <FloatingInput placeholder="Company (optional)" icon="🏢" value={form.company} onChange={set("company")} />
              </div>

              {/* Textarea */}
              <div>
                <FloatingInput placeholder="Your message *" multiline rows={6} value={form.message} onChange={set("message")} />
                {errors.message && <div style={{ color: "#f87171", fontSize: 12, marginTop: 4, marginLeft: 4 }}>Required</div>}
              </div>

              <p style={{ fontSize: 12.5, color: "rgba(148,163,184,0.5)", margin: "-4px 0 0", lineHeight: 1.6 }}>
                🔒 Your information is secure and never shared with third parties.
              </p>

              <SubmitButton loading={sending} sent={sent} />
            </form>
          </FadeIn>

          {/* RIGHT — Info panel */}
          <FadeIn direction="right" delay={200}>
            <div style={{ ...GLASS, padding: "32px 30px", display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Working hours */}
              <div
                style={{
                  padding: "20px 24px",
                  borderRadius: 16,
                  background: "linear-gradient(135deg, rgba(34,211,238,0.12) 0%, rgba(59,130,246,0.12) 100%)",
                  border: "1px solid rgba(34,211,238,0.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div style={{ fontSize: 32, flexShrink: 0 }}>🕘</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#f1f5f9", marginBottom: 4 }}>Working hours</div>
                  <div style={{ fontSize: 13.5, color: "rgba(148,163,184,0.8)" }}>Monday – Friday</div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: CYAN, marginTop: 2 }}>9:00 AM – 6:00 PM</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    {[
                      { label: "IST", flag: <IndiaFlag /> },
                      { label: "CET", flag: <GermanyFlag /> },
                    ].map(({ label, flag }) => (
                      <span
                        key={label}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 12,
                          padding: "4px 10px",
                          borderRadius: 999,
                          background: "rgba(0,0,0,0.25)",
                          color: "rgba(203,213,225,0.8)",
                        }}
                      >
                        <span style={{ transform: "scale(0.75)", transformOrigin: "center", display: "inline-flex" }}>{flag}</span>
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Office cards */}
              {OFFICES.map((office, i) => (
                <OfficeCard key={office.country} office={office} index={i} />
              ))}

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginTop: 4 }}>
                {STATS.map((stat, i) => (
                  <StatPill key={stat.label} {...stat} index={i} />
                ))}
              </div>

              {/* Response time */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 18px",
                  borderRadius: 14,
                  background: "rgba(16,185,129,0.08)",
                  border: "1px solid rgba(16,185,129,0.2)",
                  marginTop: 2,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#10b981",
                    flexShrink: 0,
                    boxShadow: "0 0 0 3px rgba(16,185,129,0.25)",
                  }}
                />
                <div style={{ fontSize: 13.5, color: "rgba(148,163,184,0.85)" }}>
                  <span style={{ color: "#6ee7b7", fontWeight: 600 }}>Average response time: </span>
                  under 2 hours on business days
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── Divider ── */}
        <div style={{ margin: "72px 0 56px", display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08))" }} />
          <Tag>✓ FAQ · Quick Answers</Tag>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.08), transparent)" }} />
        </div>

        {/* ── FAQ grid ── */}
        <FadeIn direction="up" delay={400}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
              maxWidth: 900,
              margin: "0 auto",
            }}
          >
            {FAQ.map((item, i) => (
              <FAQCard key={item.q} {...item} index={i} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <a
              href="/support"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 28px",
                borderRadius: 999,
                background: `linear-gradient(135deg, ${CYAN} 0%, ${BLUE} 100%)`,
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                textDecoration: "none",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 4px 20px rgba(34,211,238,0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 32px rgba(34,211,238,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(34,211,238,0.25)";
              }}
            >
              Still have questions?
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}