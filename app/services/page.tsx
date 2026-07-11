"use client";

import {
  useState,
  useEffect,
  useRef,
  ReactNode,
  CSSProperties,
} from "react";
import {
  Cpu,
  Wrench,
  BrainCircuit,
  GraduationCap,
  MonitorSmartphone,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Activity,
  Zap,
  BarChart3,
  Settings2,
  Network,
  Clock,
  CheckCircle2,
  Users,
  Award,
  TrendingUp,
  Radio,
  Layers,
  BookOpen,
  CircuitBoard,
  Move3d,
  Radar,
  MonitorCog,
  Bot,
  Code2,
  Target,
  X,
  Send,
} from "lucide-react";

// ─── Tokens ──────────────────────────────────────────────────────────────────

const C = {
  cyan:   "#22d3ee",
  cyanD:  "#0891b2",
  blue:   "#3b82f6",
  blueD:  "#1d4ed8",
  slate50: "#f8fafc",
  slate900: "#0f172a",
  slate950: "#020617",
};

const WHATSAPP_NUMBER = "4915511049025"; // +49 15511049025

// ─── Hook: InView ─────────────────────────────────────────────────────────────

function useInView(ref: React.RefObject<HTMLElement>, threshold = 0.12): boolean {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return visible;
}

// ─── Hook: Counter ────────────────────────────────────────────────────────────

function useCounter(target: number, duration = 1800, start = false): number {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const step = target / (duration / 16);
    let cur = 0;
    const id = setInterval(() => {
      cur = Math.min(cur + step, target);
      setVal(Math.round(cur));
      if (cur >= target) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [start, target, duration]);
  return val;
}

// ─── FadeIn ───────────────────────────────────────────────────────────────────

type Dir = "up" | "down" | "left" | "right" | "scale";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  dir?: Dir;
  className?: string;
  style?: CSSProperties;
}

function FadeIn({ children, delay = 0, dir = "up", className = "", style }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref as React.RefObject<HTMLElement>);
  const hidden: CSSProperties =
    dir === "up"    ? { opacity: 0, transform: "translateY(48px)" }
    : dir === "down"  ? { opacity: 0, transform: "translateY(-32px)" }
    : dir === "left"  ? { opacity: 0, transform: "translateX(-48px)" }
    : dir === "right" ? { opacity: 0, transform: "translateX(48px)" }
    : { opacity: 0, transform: "scale(0.88)" };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        ...(visible ? { opacity: 1, transform: "none" } : hidden),
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Chip ─────────────────────────────────────────────────────────────────────

function Chip({ children }: { children: ReactNode }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "7px 18px", borderRadius: 999,
      border: `1px solid rgba(34,211,238,0.35)`,
      background: "rgba(34,211,238,0.08)",
      color: C.cyan, fontSize: 13, fontWeight: 600,
      letterSpacing: "0.06em", textTransform: "uppercase",
      marginBottom: 24,
    }}>{children}</div>
  );
}

// ─── Stat counter card ────────────────────────────────────────────────────────

interface StatCardProps { value: number; suffix: string; label: string; delay?: number }

function StatCard({ value, suffix, label, delay = 0 }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<HTMLElement>);
  const count = useCounter(value, 1600, inView);
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        textAlign: "center",
      }}
    >
      <div style={{
        fontSize: "clamp(36px,4vw,56px)", fontWeight: 900, lineHeight: 1,
        background: `linear-gradient(135deg, ${C.cyan}, ${C.blue})`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: 14, color: "rgba(148,163,184,0.75)", marginTop: 8, fontWeight: 500, letterSpacing: "0.04em" }}>
        {label}
      </div>
    </div>
  );
}

// ─── Service data ─────────────────────────────────────────────────────────────

interface Service {
  Icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  tag: string;
  image: string;
  accent: string;
}

const SERVICES: Service[] = [
  {
    Icon: Wrench,
    title: "Shopfloor Retrofit Solutions",
    description:
      "Upgrade legacy machines with smart sensors, IoT gateways and AI-powered dashboards — no production shutdown, no rip-and-replace.",
    features: [
      "Non-invasive sensor integration",
      "Real-time OPC-UA data bridge",
      "Custom SCADA dashboards",
      "Cloud & on-premise deployment",
    ],
    tag: "Infrastructure",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    accent: "rgba(34,211,238,0.15)",
  },
  {
    Icon: Activity,
    title: "Predictive Maintenance AI",
    description:
      "Detect failures weeks before they happen. AI models trained on vibration, temperature and current signatures identify degradation patterns invisible to humans.",
    features: [
      "Multi-axis vibration analysis",
      "Thermal anomaly detection",
      "RUL (remaining useful life) prediction",
      "Automated work-order generation",
    ],
    tag: "AI / ML",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    accent: "rgba(59,130,246,0.15)",
  },
  {
    Icon: BrainCircuit,
    title: "AI Programming Assistance",
    description:
      "Accelerate PLC and motion-control development with AI co-pilots that understand IEC 61131-3, Structured Text and Ladder logic.",
    features: [
      "Auto-completion for ST / LAD / FBD",
      "AI-assisted fault diagnosis",
      "Version-controlled code repository",
      "Cross-vendor compatibility layer",
    ],
    tag: "Development",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    accent: "rgba(139,92,246,0.15)",
  },
  {
    Icon: MonitorSmartphone,
    title: "Automation Product Selection",
    description:
      "Cut through vendor noise. Our engineers compare PLCs, drives, sensors and industrial networks against your exact throughput, environment and budget requirements.",
    features: [
      "Siemens, Beckhoff, Allen-Bradley expertise",
      "TCO & lifecycle analysis",
      "Supplier negotiation support",
      "Proof-of-concept lab testing",
    ],
    tag: "Consulting",
    image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800&q=80",
    accent: "rgba(34,211,238,0.15)",
  },
  {
    Icon: GraduationCap,
    title: "PLC & Embedded Training",
    description:
      "Hands-on, factory-floor-relevant programs built for engineers, technicians and fresh graduates. Learn on real hardware, not simulations.",
    features: [
      "40-hour modular curriculum",
      "Industry 4.0 capstone projects",
      "Certified instructors",
      "Job-placement assistance",
    ],
    tag: "Training",
    image: "https://images.unsplash.com/photo-1562564055-71e051d33c19?w=800&q=80",
    accent: "rgba(16,185,129,0.15)",
  },
  {
    Icon: ShieldCheck,
    title: "Automation Consulting",
    description:
      "From concept to commissioning: strategic guidance for greenfield plants and brownfield upgrades, covering system architecture, safety compliance and vendor management.",
    features: [
      "IEC 62443 cybersecurity alignment",
      "ISO 13849 functional safety",
      "Digital twin feasibility studies",
      "Ongoing technical retainer",
    ],
    tag: "Strategy",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    accent: "rgba(245,158,11,0.15)",
  },
];

// ─── Process steps ────────────────────────────────────────────────────────────

const PROCESS = [
  { num: "01", title: "Discovery", desc: "We audit your current setup — machines, data flows, pain points — and define measurable goals.", Icon: Radio },
  { num: "02", title: "Architecture", desc: "Our engineers design the hardware topology, software stack and integration roadmap.", Icon: Layers },
  { num: "03", title: "Deployment", desc: "Phased implementation with parallel-run validation so production is never at risk.", Icon: Settings2 },
  { num: "04", title: "Optimise", desc: "Continuous model retraining and system tuning to compound ROI over time.", Icon: TrendingUp },
];

// ─── Training programs ────────────────────────────────────────────────────────

interface TrainingProgram {
  title: string;
  duration: string;
  level: string;
  modules: string[];
  image: string;
  includes?: string;
}

const TRAINING: TrainingProgram[] = [
  {
    title: "PLC Programming",
    duration: "40 Hours",
    modules: ["IEC 61131-3 Languages", "Siemens TIA Portal", "Allen-Bradley Studio 5000", "Motion & Safety PLCs", "HMI Integration", "Fieldbus Protocols"],
    image: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&q=80",
    level: "Beginner → Advanced",
  },
  {
    title: "Embedded Systems — Basic Course",
    duration: "3 Months",
    modules: [
      "Microcontroller Fundamentals & Digital Logic",
      "Arduino Sensor & Motor Interfacing",
      "Bluetooth-Controlled Robotics (HC-05)",
      "ESP32 Wi-Fi, BLE & IoT (HTTP/MQTT)",
      "2 Hands-on Capstone Projects",
      "Practical Assessment & Certification",
    ],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    level: "Beginner — No Experience Required",
    includes: "Arduino Uno · ESP32",
  },
  {
    title: "Embedded Systems — Advanced Course",
    duration: "6 Months",
    modules: [
      "Register-Level Embedded C & ISRs",
      "ARM7 (LPC2148) Architecture & Thumb Mode",
      "UART / SPI / I2C Peripheral Interfacing",
      "FreeRTOS: Tasks, Scheduling & Semaphores",
      "ARM7 Capstone: Industrial Monitoring System",
      "Practical Assessment & Certification",
    ],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    level: "Intermediate → Advanced",
    includes: "8051 · ARM7 (LPC2148) · Embedded C",
  },
  {
    title: "Industry 4.0 Masterclass",
    duration: "24 Hours",
    modules: ["Digital Twin Concepts", "OPC-UA Architecture", "Cloud SCADA (AWS/Azure)", "Cybersecurity for OT", "Data Analytics with Python", "AI Model Deployment"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    level: "Professional",
  },
];

// ─── Tech stack — categorized ──────────────────────────────────────────────────

interface TechCategory {
  Icon: React.ElementType;
  category: string;
  items: string[];
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    Icon: CircuitBoard,
    category: "PLC",
    items: ["Mitsubishi", "Delta", "Siemens", "Omron", "ABB", "Keyence", "Schneider", "Allen-Bradley"],
  },
  {
    Icon: Move3d,
    category: "Motion Control",
    items: ["Servo & Stepper Systems", "Pneumatic & Hydraulic Systems", "Induction Motors with VFDs"],
  },
  {
    Icon: Radar,
    category: "Communication",
    items: ["Modbus", "Profinet", "CC-Link", "OPC-UA", "MQTT / Sparkplug"],
  },
  {
    Icon: MonitorCog,
    category: "HMI / SCADA",
    items: ["GT Designer", "Vconn", "Woodtek HMI", "Wonderware InTouch", "Grafana"],
  },
  {
    Icon: Bot,
    category: "Robotics",
    items: ["ABB", "FANUC (programming & simulation)"],
  },
  {
    Icon: Code2,
    category: "Software",
    items: [
      "GX Works", "TIA Portal", "Sysmac Studio", "WPL Soft", "CODESYS",
      "CX Programmer", "RSLogix 500", "SolidWorks", "Arduino IDE", "EPLAN",
      "Python / TensorFlow", "Node-RED", "InfluxDB",
    ],
  },
  {
    Icon: Target,
    category: "Core Focus",
    items: ["Industrial Control Systems", "Industrial IoT", "Robotics"],
  },
];

// ─── ServiceCard ──────────────────────────────────────────────────────────────

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { Icon } = service;

  return (
    <FadeIn dir="up" delay={index * 90}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: 24,
          overflow: "hidden",
          border: `1px solid ${hovered ? "rgba(34,211,238,0.4)" : "rgba(255,255,255,0.07)"}`,
          background: "rgba(15,23,42,0.7)",
          backdropFilter: "blur(16px)",
          transform: hovered ? "translateY(-8px)" : "none",
          transition: "all 0.35s cubic-bezier(.22,1,.36,1)",
          boxShadow: hovered ? "0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(34,211,238,0.15)" : "0 4px 24px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
          <img
            src={service.image}
            alt={service.title}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transform: hovered ? "scale(1.07)" : "scale(1)",
              transition: "transform 0.7s cubic-bezier(.22,1,.36,1)",
              filter: "brightness(0.55)",
            }}
          />
          {/* Overlay gradient */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, transparent 40%, rgba(15,23,42,0.95) 100%)",
          }} />
          {/* Tag */}
          <div style={{
            position: "absolute", top: 16, left: 16,
            padding: "4px 12px", borderRadius: 999,
            background: "rgba(34,211,238,0.18)",
            border: "1px solid rgba(34,211,238,0.35)",
            color: C.cyan, fontSize: 11, fontWeight: 700,
            letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            {service.tag}
          </div>
          {/* Icon overlay */}
          <div style={{
            position: "absolute", bottom: 16, right: 16,
            width: 48, height: 48, borderRadius: 14,
            background: "rgba(34,211,238,0.15)",
            border: "1px solid rgba(34,211,238,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(8px)",
            transform: hovered ? "scale(1.1) rotate(-6deg)" : "none",
            transition: "transform 0.35s ease",
          }}>
            <Icon size={22} color={C.cyan} />
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "28px 28px 32px", flex: 1, display: "flex", flexDirection: "column" }}>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", marginBottom: 12, lineHeight: 1.25 }}>
            {service.title}
          </h3>
          <p style={{ fontSize: 14.5, color: "rgba(148,163,184,0.85)", lineHeight: 1.75, marginBottom: 24, flex: 1 }}>
            {service.description}
          </p>

          {/* Features */}
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 8 }}>
            {service.features.map((f) => (
              <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "rgba(203,213,225,0.8)" }}>
                <CheckCircle2 size={14} color={C.cyan} style={{ flexShrink: 0 }} />
                {f}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "none", border: "none", padding: 0, cursor: "pointer",
              color: hovered ? C.cyan : "rgba(148,163,184,0.7)",
              fontSize: 14, fontWeight: 700, letterSpacing: "0.02em",
              transition: "color 0.2s",
              fontFamily: "inherit",
            }}
          >
            Learn more
            <ArrowRight
              size={16}
              style={{
                transform: hovered ? "translateX(6px)" : "none",
                transition: "transform 0.25s ease",
              }}
            />
          </button>
        </div>
      </div>
    </FadeIn>
  );
}

// ─── ProcessStep ──────────────────────────────────────────────────────────────

function ProcessStep({ step, index, total }: { step: typeof PROCESS[0]; index: number; total: number }) {
  const { Icon } = step;
  const [hovered, setHovered] = useState(false);

  return (
    <FadeIn dir="up" delay={index * 120}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative" }}
      >
        {/* Connector line */}
        {index < total - 1 && (
          <div style={{
            position: "absolute", top: 36, left: "calc(50% + 36px)",
            width: "calc(100% - 72px)", height: 1,
            background: "linear-gradient(90deg, rgba(34,211,238,0.4), rgba(34,211,238,0.05))",
            display: "none",
          }} className="process-connector" />
        )}

        {/* Circle */}
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          border: `2px solid ${hovered ? C.cyan : "rgba(34,211,238,0.3)"}`,
          background: hovered ? "rgba(34,211,238,0.12)" : "rgba(15,23,42,0.8)",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 20, position: "relative", zIndex: 1,
          transition: "all 0.3s ease",
          boxShadow: hovered ? `0 0 0 8px rgba(34,211,238,0.08)` : "none",
        }}>
          <Icon size={28} color={hovered ? C.cyan : "rgba(148,163,184,0.6)"} style={{ transition: "color 0.3s" }} />
          <div style={{
            position: "absolute", top: -6, right: -6,
            width: 22, height: 22, borderRadius: "50%",
            background: `linear-gradient(135deg, ${C.cyan}, ${C.blue})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 9, fontWeight: 900, color: "#020617",
          }}>
            {step.num}
          </div>
        </div>

        <h4 style={{ fontSize: 17, fontWeight: 800, color: "#f1f5f9", marginBottom: 10 }}>{step.title}</h4>
        <p style={{ fontSize: 13.5, color: "rgba(148,163,184,0.75)", lineHeight: 1.7, maxWidth: 200 }}>{step.desc}</p>
      </div>
    </FadeIn>
  );
}

// ─── TrainingCard ─────────────────────────────────────────────────────────────

function TrainingCard({ program, index, onEnrol }: { program: TrainingProgram; index: number; onEnrol: (program: TrainingProgram) => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeIn dir="up" delay={index * 130}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: 24, overflow: "hidden",
          border: `1px solid ${hovered ? "rgba(34,211,238,0.4)" : "rgba(255,255,255,0.07)"}`,
          background: "rgba(15,23,42,0.75)",
          transform: hovered ? "translateY(-6px)" : "none",
          transition: "all 0.35s cubic-bezier(.22,1,.36,1)",
          boxShadow: hovered ? "0 20px 56px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
          <img
            src={program.image}
            alt={program.title}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transform: hovered ? "scale(1.08)" : "scale(1)",
              filter: "brightness(0.4)",
              transition: "transform 0.7s cubic-bezier(.22,1,.36,1)",
            }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, transparent, rgba(15,23,42,0.9))",
          }} />
          <div style={{
            position: "absolute", bottom: 16, left: 20, right: 100,
          }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: C.cyan,
              letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4,
            }}>
              {program.level}
            </div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#f1f5f9", lineHeight: 1.15 }}>{program.title}</div>
          </div>
          <div style={{
            position: "absolute", top: 16, right: 16,
            padding: "5px 14px", borderRadius: 999,
            background: "rgba(34,211,238,0.18)",
            border: "1px solid rgba(34,211,238,0.35)",
            color: C.cyan, fontSize: 12, fontWeight: 700,
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <Clock size={12} />
            {program.duration}
          </div>
        </div>

        {/* Modules */}
        <div style={{ padding: "24px 24px 28px", flex: 1, display: "flex", flexDirection: "column" }}>
          {program.includes && (
            <div style={{
              display: "inline-flex", alignSelf: "flex-start",
              alignItems: "center", gap: 6,
              padding: "5px 12px", borderRadius: 999, marginBottom: 16,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
              fontSize: 11.5, fontWeight: 600, color: "rgba(203,213,225,0.75)",
              letterSpacing: "0.02em",
            }}>
              <Cpu size={12} color={C.cyan} />
              {program.includes}
            </div>
          )}

          <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(148,163,184,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
            Curriculum
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 12px", flex: 1 }}>
            {program.modules.map((m) => (
              <div key={m} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(203,213,225,0.8)" }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.cyan, flexShrink: 0 }} />
                {m}
              </div>
            ))}
          </div>

          <button
            onClick={() => onEnrol(program)}
            style={{
            marginTop: 24, width: "100%", height: 46, borderRadius: 12,
            border: `1px solid ${hovered ? C.cyan : "rgba(34,211,238,0.3)"}`,
            background: hovered ? "rgba(34,211,238,0.1)" : "transparent",
            color: hovered ? C.cyan : "rgba(148,163,184,0.7)",
            fontSize: 14, fontWeight: 700, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            transition: "all 0.25s ease",
            fontFamily: "inherit",
          }}>
            <BookOpen size={15} />
            Enrol now
          </button>
        </div>
      </div>
    </FadeIn>
  );
}

// ─── TechCategoryBlock ─────────────────────────────────────────────────────────

function TechCategoryBlock({ group, index }: { group: TechCategory; index: number }) {
  const { Icon } = group;
  return (
    <FadeIn dir="up" delay={index * 90}>
      <div style={{
        borderRadius: 20,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.02)",
        padding: "24px 26px",
        height: "100%",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10, flexShrink: 0,
            background: "rgba(34,211,238,0.1)",
            border: "1px solid rgba(34,211,238,0.22)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon size={18} color={C.cyan} />
          </div>
          <div style={{
            fontSize: 13, fontWeight: 800, color: "#f1f5f9",
            letterSpacing: "0.06em", textTransform: "uppercase",
          }}>
            {group.category}
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {group.items.map((t) => (
            <div key={t} style={{
              padding: "8px 14px", borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.09)",
              background: "rgba(255,255,255,0.03)",
              fontSize: 13, fontWeight: 600, color: "rgba(203,213,225,0.8)",
              letterSpacing: "0.01em",
              transition: "border-color 0.2s, color 0.2s, background 0.2s",
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(34,211,238,0.4)"; el.style.color = C.cyan; el.style.background = "rgba(34,211,238,0.07)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.09)"; el.style.color = "rgba(203,213,225,0.8)"; el.style.background = "rgba(255,255,255,0.03)"; }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

// ─── EnrolModal ─────────────────────────────────────────────────────────────

interface EnrolModalProps {
  program: TrainingProgram | null;
  onClose: () => void;
}

function EnrolModal({ program, onClose }: EnrolModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [batch, setBatch] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const open = !!program;

  useEffect(() => {
    if (open) {
      setName(""); setPhone(""); setEmail(""); setBatch("");
      setSubmitting(false);
      const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [open, program]);

  if (!open || !program) return null;

  const canSubmit = name.trim().length > 1 && phone.trim().length > 5;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);

    const lines = [
      `New enrolment request`,
      ``,
      `Course: ${program.title}`,
      `Duration: ${program.duration}`,
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      email.trim() ? `Email: ${email.trim()}` : null,
      batch.trim() ? `Preferred batch: ${batch.trim()}` : null,
    ].filter(Boolean);

    const message = lines.join("\n");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");

    setTimeout(() => {
      setSubmitting(false);
      onClose();
    }, 400);
  };

  const inputStyle: CSSProperties = {
    width: "100%",
    height: 48,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.03)",
    color: "#f1f5f9",
    fontSize: 14.5,
    padding: "0 16px",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s, background 0.2s",
    boxSizing: "border-box",
  };

  const labelStyle: CSSProperties = {
    display: "block",
    fontSize: 12.5,
    fontWeight: 700,
    color: "rgba(148,163,184,0.7)",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    marginBottom: 8,
  };

  return (
    <div
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(2,6,23,0.75)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
        animation: "enrolFadeIn 0.2s ease",
      }}
    >
      <style>{`
        @keyframes enrolFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes enrolPopIn { from { opacity: 0; transform: translateY(16px) scale(0.97); } to { opacity: 1; transform: none; } }
        .enrol-input:focus { border-color: ${C.cyan} !important; background: rgba(34,211,238,0.06) !important; }
      `}</style>

      <div
        style={{
          width: "100%", maxWidth: 440,
          borderRadius: 22,
          border: "1px solid rgba(34,211,238,0.25)",
          background: "linear-gradient(180deg, #0f1b30 0%, #0a1424 100%)",
          boxShadow: "0 30px 90px rgba(0,0,0,0.55)",
          padding: "22px 26px 20px",
          animation: "enrolPopIn 0.28s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
            <img
              src="/LOGO.jpeg"
              alt="Trifactron logo"
              style={{
                width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                objectFit: "cover",
                border: "1px solid rgba(34,211,238,0.3)",
              }}
            />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: C.cyan, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>
                Enrol now
              </div>
              <h3 style={{
                fontSize: 17, fontWeight: 900, color: "#f1f5f9", margin: 0, lineHeight: 1.22,
                overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box",
                WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
              }}>
                {program.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: 32, height: 32, borderRadius: 9, flexShrink: 0,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              color: "rgba(203,213,225,0.8)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={15} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle} htmlFor="enrol-name">Full name *</label>
            <input
              id="enrol-name"
              className="enrol-input"
              style={inputStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Müller"
              required
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle} htmlFor="enrol-phone">WhatsApp / phone number *</label>
            <input
              id="enrol-phone"
              className="enrol-input"
              style={inputStyle}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+49 151 234 5678"
              required
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle} htmlFor="enrol-email">Email (optional)</label>
            <input
              id="enrol-email"
              className="enrol-input"
              style={inputStyle}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@company.com"
            />
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle} htmlFor="enrol-batch">Preferred batch (optional)</label>
            <input
              id="enrol-batch"
              className="enrol-input"
              style={inputStyle}
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              placeholder="Weekday mornings, starting August"
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            style={{
              width: "100%", height: 48, borderRadius: 13, border: "none",
              background: canSubmit ? "linear-gradient(135deg, #25D366, #128C7E)" : "rgba(255,255,255,0.08)",
              color: canSubmit ? "#fff" : "rgba(148,163,184,0.5)",
              fontSize: 14.5, fontWeight: 800, cursor: canSubmit ? "pointer" : "not-allowed",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              fontFamily: "inherit",
              boxShadow: canSubmit ? "0 10px 30px rgba(37,211,102,0.3)" : "none",
              transition: "all 0.2s ease",
            }}
          >
            <Send size={16} />
            {submitting ? "Opening WhatsApp…" : "Continue on WhatsApp"}
          </button>

          <div style={{ marginTop: 12, fontSize: 11.5, color: "rgba(148,163,184,0.5)", textAlign: "center" }}>
            Sends to +49 155 1104 9025 · No spam, ever
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {

  const [enrolProgram, setEnrolProgram] = useState<TrainingProgram | null>(null);

  // Animated background grid ref
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let t = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Floating particles
    const PARTICLES = Array.from({ length: 55 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.5 + 0.4,
      sx: (Math.random() - 0.5) * 0.00012,
      sy: (Math.random() - 0.5) * 0.00012,
      a: Math.random(),
    }));

    const draw = () => {
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);
      t += 1;

      PARTICLES.forEach((p) => {
        p.x = (p.x + p.sx + 1) % 1;
        p.y = (p.y + p.sy + 1) % 1;
        const alpha = 0.15 + 0.12 * Math.sin(t * 0.018 + p.a * 6);
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,211,238,${alpha})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", color: "#f1f5f9", background: C.slate950 }}>

      {/* ══════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>

        {/* Background image */}
        <div style={{ position: "absolute", inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=1600&q=80"
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.18) saturate(0.6)" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(135deg, rgba(2,6,23,0.97) 0%, rgba(15,23,42,0.85) 60%, rgba(2,6,23,0.97) 100%)`,
          }} />
        </div>

        {/* Animated particles canvas */}
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        />

        {/* Glow blobs */}
        <div style={{ position: "absolute", top: "15%", left: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "8%",  width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 10, maxWidth: 1400, margin: "0 auto", padding: "120px 24px 100px", width: "100%" }}>

          <FadeIn dir="up">
            <Chip><Zap size={13} /> Industrial Automation · AI-Powered</Chip>
          </FadeIn>

          <FadeIn dir="up" delay={100}>
            <h1 style={{
              fontSize: "clamp(44px, 7vw, 96px)",
              fontWeight: 900, lineHeight: 1.02, letterSpacing: "-2px",
              margin: "0 0 28px", maxWidth: 900,
            }}>
              Intelligent{" "}
              <span style={{
                background: `linear-gradient(135deg, ${C.cyan} 0%, #38bdf8 45%, ${C.blue} 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                Industrial
              </span>
              <br />Automation Solutions
            </h1>
          </FadeIn>

          <FadeIn dir="up" delay={200}>
            <p style={{ fontSize: "clamp(16px,1.8vw,20px)", color: "rgba(148,163,184,0.9)", lineHeight: 1.8, maxWidth: 620, marginBottom: 48 }}>
              End-to-end AI-powered services designed to maximise throughput, reduce unplanned downtime and future-proof industrial operations — from single-machine retrofits to full plant-wide digital transformation.
            </p>
          </FadeIn>

          <FadeIn dir="up" delay={300}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button style={{
                height: 54, padding: "0 32px", borderRadius: 14, border: "none",
                background: `linear-gradient(135deg, ${C.cyan}, ${C.blue})`,
                color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 10,
                boxShadow: "0 8px 32px rgba(34,211,238,0.3)",
                fontFamily: "inherit",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 14px 40px rgba(34,211,238,0.4)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(34,211,238,0.3)"; }}
              >
                Explore Services <ArrowRight size={17} />
              </button>
              <button style={{
                height: 54, padding: "0 32px", borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.04)",
                color: "#f1f5f9", fontSize: 15, fontWeight: 600, cursor: "pointer",
                fontFamily: "inherit",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,211,238,0.5)"; (e.currentTarget as HTMLElement).style.background = "rgba(34,211,238,0.06)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}
              >
                View Case Studies
              </button>
            </div>
          </FadeIn>

          {/* Stats row */}
          <FadeIn dir="up" delay={450}>
            <div style={{
              marginTop: 80, paddingTop: 48,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px,1fr))", gap: 32,
            }}>
              <StatCard value={500}  suffix="+"  label="Clients served"       delay={0}   />
              <StatCard value={99}   suffix="%"  label="On-time delivery"      delay={100} />
              <StatCard value={12}   suffix="+"  label="Countries"             delay={200} />
              <StatCard value={40}   suffix="h"  label="Training hours"        delay={300} />
              <StatCard value={8}    suffix="+"  label="Years experience"      delay={400} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SERVICES GRID
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "120px 0", background: `linear-gradient(180deg, ${C.slate950} 0%, #0a1628 50%, ${C.slate950} 100%)`, position: "relative" }}>
        {/* Subtle grid overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

          <FadeIn dir="up" style={{ textAlign: "center", marginBottom: 72 }}>
            <Chip><Settings2 size={13} /> What We Deliver</Chip>
            <h2 style={{ fontSize: "clamp(34px,4vw,60px)", fontWeight: 900, letterSpacing: "-1.5px", margin: "0 0 20px", lineHeight: 1.08 }}>
              Six Ways We{" "}
              <span style={{ background: `linear-gradient(135deg, ${C.cyan}, ${C.blue})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Transform
              </span>{" "}
              Operations
            </h2>
            <p style={{ fontSize: 17, color: "rgba(148,163,184,0.8)", maxWidth: 560, margin: "0 auto", lineHeight: 1.75 }}>
              Every service is delivered by engineers with hands-on factory-floor experience — not just consultants with slide decks.
            </p>
          </FadeIn>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
            gap: 28,
          }}>
            {SERVICES.map((s, i) => <ServiceCard key={s.title} service={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FEATURED BENTO — PREDICTIVE MAINTENANCE DEEP DIVE
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "0 0 120px", background: C.slate950 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,480px),1fr))",
            gap: 40, alignItems: "center",
          }}>
            {/* Left image */}
            <FadeIn dir="left">
              <div style={{ position: "relative", borderRadius: 28, overflow: "hidden" }}>
                <img
                  src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=900&q=80"
                  alt="Predictive Maintenance"
                  style={{ width: "100%", height: 520, objectFit: "cover", filter: "brightness(0.7) saturate(0.8)" }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(135deg, rgba(34,211,238,0.15) 0%, transparent 60%)",
                }} />
                {/* Floating metric card */}
                <div style={{
                  position: "absolute", bottom: 28, left: 28, right: 28,
                  borderRadius: 18, padding: "20px 24px",
                  background: "rgba(2,6,23,0.82)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(34,211,238,0.2)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(148,163,184,0.7)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Machine Health Score</div>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 0 3px rgba(16,185,129,0.25)" }} />
                  </div>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
                    {[82, 91, 76, 95, 88, 93, 97].map((v, i) => (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                        <div style={{
                          width: "100%", borderRadius: 4,
                          height: v * 0.6,
                          background: v > 90
                            ? `linear-gradient(180deg, ${C.cyan}, ${C.cyanD})`
                            : v > 80
                            ? "linear-gradient(180deg, rgba(34,211,238,0.4), rgba(34,211,238,0.2))"
                            : "linear-gradient(180deg, rgba(245,158,11,0.5), rgba(245,158,11,0.2))",
                          transition: "height 0.3s ease",
                        }} />
                        <div style={{ fontSize: 10, color: "rgba(148,163,184,0.5)" }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Right copy */}
            <FadeIn dir="right" delay={150}>
              <Chip><Activity size={13} /> Predictive Maintenance</Chip>
              <h2 style={{ fontSize: "clamp(30px,3.5vw,52px)", fontWeight: 900, letterSpacing: "-1.2px", lineHeight: 1.1, margin: "0 0 24px" }}>
                Detect failures{" "}
                <span style={{ background: `linear-gradient(135deg, ${C.cyan}, ${C.blue})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  weeks
                </span>{" "}
                before they happen
              </h2>
              <p style={{ fontSize: 16.5, color: "rgba(148,163,184,0.85)", lineHeight: 1.8, marginBottom: 36 }}>
                Our AI models are trained on millions of sensor readings from real industrial environments. By fusing vibration spectral analysis, thermal imaging and electrical current signatures, the system identifies degradation patterns long before any conventional alarm would trigger — giving your team the runway to plan maintenance proactively.
              </p>

              {[
                { icon: BarChart3,   label: "Up to 40% reduction in unplanned downtime" },
                { icon: TrendingUp,  label: "ROI typically achieved within 6 months" },
                { icon: Network,     label: "Integrates with existing CMMS / ERP systems" },
                { icon: ShieldCheck, label: "ISO 55000 asset management aligned" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                    background: "rgba(34,211,238,0.1)",
                    border: "1px solid rgba(34,211,238,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={18} color={C.cyan} />
                  </div>
                  <span style={{ fontSize: 15, color: "rgba(203,213,225,0.9)" }}>{label}</span>
                </div>
              ))}

              <button style={{
                marginTop: 16, height: 52, padding: "0 28px", borderRadius: 14, border: "none",
                background: `linear-gradient(135deg, ${C.cyan}, ${C.blue})`,
                color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 10,
                boxShadow: "0 8px 28px rgba(34,211,238,0.28)",
                fontFamily: "inherit",
              }}>
                See how it works <ChevronRight size={17} />
              </button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          HOW WE WORK — PROCESS
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "100px 0 120px", background: "#070e1c", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>
          <FadeIn dir="up" style={{ textAlign: "center", marginBottom: 72 }}>
            <Chip><Network size={13} /> Our Process</Chip>
            <h2 style={{ fontSize: "clamp(34px,4vw,58px)", fontWeight: 900, letterSpacing: "-1.5px", margin: "0 0 18px" }}>
              From Audit to{" "}
              <span style={{ background: `linear-gradient(135deg, ${C.cyan}, ${C.blue})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Optimised
              </span>
            </h2>
            <p style={{ fontSize: 16.5, color: "rgba(148,163,184,0.75)", maxWidth: 500, margin: "0 auto", lineHeight: 1.75 }}>
              A structured four-phase methodology that de-risks every engagement and delivers measurable results on schedule.
            </p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 32 }}>
            {PROCESS.map((step, i) => (
              <ProcessStep key={step.num} step={step} index={i} total={PROCESS.length} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          BENTO — SHOPFLOOR RETROFIT
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "120px 0", background: C.slate950 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,460px),1fr))",
            gap: 40, alignItems: "center",
          }}>
            <FadeIn dir="left">
              <Chip><Wrench size={13} /> Shopfloor Retrofit</Chip>
              <h2 style={{ fontSize: "clamp(30px,3.5vw,52px)", fontWeight: 900, letterSpacing: "-1.2px", lineHeight: 1.1, margin: "0 0 24px" }}>
                Smart machines.{" "}
                <span style={{ background: `linear-gradient(135deg, ${C.cyan}, ${C.blue})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Zero downtime.
                </span>
              </h2>
              <p style={{ fontSize: 16.5, color: "rgba(148,163,184,0.85)", lineHeight: 1.8, marginBottom: 36 }}>
                Our retrofit kits bolt onto CNC machines, presses, conveyors and compressors in hours. A ruggedised edge gateway captures raw signals at up to 50 kHz, runs on-device inference and pushes KPIs to your dashboard in real time — all without touching the machine controller.
              </p>

              {/* Mini specs grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 36 }}>
                {[
                  { label: "Sample rate",    value: "50 kHz"  },
                  { label: "Install time",   value: "< 4 hrs" },
                  { label: "Connectivity",   value: "OPC-UA, MQTT" },
                  { label: "Power",          value: "PoE / 24 VDC" },
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    padding: "16px 18px", borderRadius: 14,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}>
                    <div style={{ fontSize: 11, color: "rgba(148,163,184,0.5)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{label}</div>
                    <div style={{ fontSize: 17, fontWeight: 800, color: C.cyan }}>{value}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn dir="right" delay={150}>
              <div style={{ position: "relative", borderRadius: 28, overflow: "hidden" }}>
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900&q=80"
                  alt="Factory shopfloor retrofit"
                  style={{ width: "100%", height: 500, objectFit: "cover", filter: "brightness(0.65) saturate(0.75)" }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(225deg, rgba(59,130,246,0.18) 0%, transparent 55%)",
                }} />
                {/* Status badge */}
                <div style={{
                  position: "absolute", top: 24, left: 24,
                  padding: "10px 18px", borderRadius: 14,
                  background: "rgba(2,6,23,0.82)", backdropFilter: "blur(12px)",
                  border: "1px solid rgba(16,185,129,0.3)",
                  display: "flex", alignItems: "center", gap: 10,
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 0 3px rgba(16,185,129,0.25)" }} />
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#6ee7b7" }}>All machines online</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          TRAINING PROGRAMS
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "120px 0", background: "#070e1c", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <FadeIn dir="up" style={{ textAlign: "center", marginBottom: 72 }}>
            <Chip><GraduationCap size={13} /> Professional Training</Chip>
            <h2 style={{ fontSize: "clamp(34px,4vw,58px)", fontWeight: 900, letterSpacing: "-1.5px", margin: "0 0 20px" }}>
              Build Real{" "}
              <span style={{ background: `linear-gradient(135deg, ${C.cyan}, ${C.blue})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Expertise
              </span>
            </h2>
            <p style={{ fontSize: 17, color: "rgba(148,163,184,0.8)", maxWidth: 540, margin: "0 auto", lineHeight: 1.75 }}>
              Hands-on programs taught by practicing engineers — on real PLC and embedded hardware, not just simulators.
            </p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,340px),1fr))", gap: 28 }}>
            {TRAINING.map((p, i) => <TrainingCard key={p.title} program={p} index={i} onEnrol={setEnrolProgram} />)}
          </div>

          {/* Benefits bar */}
          <FadeIn dir="up" delay={200}>
            <div style={{
              marginTop: 56,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))",
              gap: 20,
            }}>
              {[
                { Icon: Users,        label: "Small cohorts",        sub: "Max 12 per batch"          },
                { Icon: Award,        label: "Certified instructors", sub: "10+ years field experience" },
                { Icon: CheckCircle2, label: "Certificate issued",    sub: "Industry-recognised"       },
                { Icon: Clock,        label: "Flexible schedule",     sub: "Weekday & weekend batches"  },
              ].map(({ Icon, label, sub }) => (
                <div key={label} style={{
                  padding: "22px 20px", borderRadius: 18,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  display: "flex", alignItems: "flex-start", gap: 14,
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                    background: "rgba(34,211,238,0.1)",
                    border: "1px solid rgba(34,211,238,0.18)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={18} color={C.cyan} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0", marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 12.5, color: "rgba(148,163,184,0.6)" }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          TECH STACK — CATEGORIZED
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "100px 0 100px", background: C.slate950 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>
          <FadeIn dir="up" style={{ textAlign: "center", marginBottom: 56 }}>
            <Chip><Cpu size={13} /> Platforms & Technologies</Chip>
            <h2 style={{ fontSize: "clamp(32px,3.8vw,54px)", fontWeight: 900, letterSpacing: "-1.5px", margin: "0 0 16px", lineHeight: 1.1 }}>
              What We Work{" "}
              <span style={{ background: `linear-gradient(135deg, ${C.cyan}, ${C.blue})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                With
              </span>
            </h2>
            <p style={{ fontSize: 16, color: "rgba(148,163,184,0.75)", maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
              Multi-vendor expertise across PLCs, motion control, communication protocols, HMI/SCADA, robotics and engineering software.
            </p>
          </FadeIn>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,320px),1fr))",
            gap: 22,
          }}>
            {TECH_CATEGORIES.map((group, i) => (
              <TechCategoryBlock key={group.category} group={group} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "0 0 0", background: C.slate950 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px 120px" }}>
          <FadeIn dir="scale">
            <div style={{
              borderRadius: 32, overflow: "hidden", position: "relative",
              background: "linear-gradient(135deg, #0a1628 0%, #0f172a 100%)",
              border: "1px solid rgba(34,211,238,0.2)",
              padding: "80px 60px",
              textAlign: "center",
            }}>
              {/* Background image */}
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&q=80"
                alt=""
                style={{
                  position: "absolute", inset: 0, width: "100%", height: "100%",
                  objectFit: "cover", filter: "brightness(0.1) saturate(0.5)",
                }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(34,211,238,0.1) 0%, rgba(59,130,246,0.08) 100%)" }} />
              {/* Glow */}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                <Chip><Zap size={13} /> Get Started Today</Chip>
                <h2 style={{
                  fontSize: "clamp(32px,4.5vw,68px)", fontWeight: 900,
                  letterSpacing: "-1.5px", lineHeight: 1.08, margin: "0 0 24px", color: "#f1f5f9",
                }}>
                  Ready to Modernise<br />
                  <span style={{ background: `linear-gradient(135deg, ${C.cyan} 0%, #38bdf8 50%, ${C.blue} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    Your Factory?
                  </span>
                </h2>
                <p style={{ fontSize: 18, color: "rgba(148,163,184,0.85)", lineHeight: 1.75, maxWidth: 560, margin: "0 auto 44px" }}>
                  Book a free 30-minute engineering consultation. We'll assess your current setup and outline a concrete roadmap — no sales pressure, no jargon.
                </p>
                <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                  <button style={{
                    height: 58, padding: "0 40px", borderRadius: 16, border: "none",
                    background: `linear-gradient(135deg, ${C.cyan}, ${C.blue})`,
                    color: "#fff", fontSize: 16, fontWeight: 800, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 10,
                    boxShadow: "0 12px 40px rgba(34,211,238,0.35)",
                    fontFamily: "inherit",
                    letterSpacing: "0.01em",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 50px rgba(34,211,238,0.45)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(34,211,238,0.35)"; }}
                  >
                    Book Free Consultation <ArrowRight size={18} />
                  </button>
                  <button style={{
                    height: 58, padding: "0 36px", borderRadius: 16,
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.05)",
                    color: "#f1f5f9", fontSize: 16, fontWeight: 700, cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,211,238,0.5)"; (e.currentTarget as HTMLElement).style.background = "rgba(34,211,238,0.07)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
                  >
                    Download Brochure
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <EnrolModal program={enrolProgram} onClose={() => setEnrolProgram(null)} />

    </div>
  );
}