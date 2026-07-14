"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Cpu, BrainCircuit, Factory, Zap, Shield, TrendingUp, Activity, Bot, Cog, MessageCircle, LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ─── Neural Node Canvas ──────────────────────────────────────────────── */
function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      pulse: number;
    }

    const nodeCount = 28;
    const nodes: Node[] = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2.5 + 1.5,
      pulse: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const draw = () => {
      t += 0.012;
      ctx.clearRect(0, 0, W(), H());

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.35;
            const gradient = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            gradient.addColorStop(0, `rgba(0, 212, 255, ${alpha})`);
            gradient.addColorStop(1, `rgba(59, 130, 246, ${alpha})`);
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      nodes.forEach((n) => {
        n.pulse += 0.04;
        const glow = (Math.sin(n.pulse) + 1) / 2;

        // Outer glow
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
        grad.addColorStop(0, `rgba(0, 212, 255, ${0.4 * glow})`);
        grad.addColorStop(1, "rgba(0,212,255,0)");
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${0.7 + 0.3 * glow})`;
        ctx.fill();

        // Move
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W()) n.vx *= -1;
        if (n.y < 0 || n.y > H()) n.vy *= -1;
      });

      // Traveling signal
      const signalProgress = (t * 0.4) % 1;
      const si = Math.floor(signalProgress * nodes.length) % nodes.length;
      const sj = (si + 1) % nodes.length;
      const sx = nodes[si].x + (nodes[sj].x - nodes[si].x) * (signalProgress * nodes.length % 1);
      const sy = nodes[si].y + (nodes[sj].y - nodes[si].y) * (signalProgress * nodes.length % 1);
      const sigGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, 8);
      sigGrad.addColorStop(0, "rgba(255, 255, 255, 0.9)");
      sigGrad.addColorStop(1, "rgba(0, 212, 255, 0)");
      ctx.beginPath();
      ctx.arc(sx, sy, 8, 0, Math.PI * 2);
      ctx.fillStyle = sigGrad;
      ctx.fill();

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}

/* ─── Drifting Particle Field ─────────────────────────────────────────── */
function ParticleField({ count = 14 }: { count?: number }) {
  const [particles, setParticles] = useState<
    { id: number; left: number; size: number; delay: number; duration: number }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        delay: Math.random() * 6,
        duration: Math.random() * 8 + 10,
      }))
    );
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-cyan-300"
          style={{ left: `${p.left}%`, width: p.size, height: p.size, bottom: "-5%" }}
          animate={{ y: ["0%", "-115vh"], opacity: [0, 0.7, 0.7, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

/* ─── Spinning Gears ──────────────────────────────────────────────────── */
interface GearProps {
  size: number;
  duration: number;
  reverse?: boolean;
  color?: string;
  glow?: string;
  className?: string;
}

function Gear({ size, duration, reverse = false, color = "#00D4FF", glow, className = "" }: GearProps) {
  return (
    <motion.div
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      className={className}
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        filter: glow ? `drop-shadow(0 0 ${Math.max(6, size * 0.12)}px ${glow})` : undefined,
      }}
    >
      <Cog size={size} strokeWidth={1.2} style={{ color }} />
    </motion.div>
  );
}

function SpinningGearCluster({ className = "" }: { className?: string }) {
  return (
    <div className={`relative pointer-events-none select-none ${className}`} aria-hidden="true" style={{ width: 220, height: 220 }}>
      {/* ambient glow field behind the cluster */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.16) 0%, rgba(0,212,255,0) 70%)" }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [0.92, 1.05, 0.92] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* accent orbit ring */}
      <div
        className="absolute rounded-full"
        style={{
          top: "50%",
          left: "50%",
          width: 176,
          height: 176,
          transform: "translate(-50%, -50%)",
          border: "1px dashed rgba(0,212,255,0.2)",
        }}
      />

      {/* main gear */}
      <div className="absolute top-0 left-2">
        <Gear size={138} duration={12} color="rgba(0,212,255,0.55)" glow="rgba(0,212,255,0.35)" />
      </div>

      {/* secondary interlocking gear */}
      <Gear
        size={84}
        duration={7.5}
        reverse
        color="rgba(129,140,248,0.6)"
        glow="rgba(129,140,248,0.35)"
        className="absolute bottom-0 right-0"
      />

      {/* small tertiary gear for depth */}
      <Gear
        size={40}
        duration={5}
        color="rgba(52,211,153,0.5)"
        glow="rgba(52,211,153,0.3)"
        className="absolute top-10 right-1"
      />

      {/* orbiting spark */}
      <motion.span
        className="absolute w-2 h-2 rounded-full bg-white"
        style={{ top: "50%", left: "50%", boxShadow: "0 0 10px 2px rgba(0,212,255,0.8)" }}
        animate={{
          x: [0, 88, 0, -88, 0],
          y: [-88, 0, 88, 0, -88],
          opacity: [1, 0.6, 1, 0.6, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

/* ─── Robot Buddy ─────────────────────────────────────────────────────── */
function RobotBuddy({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`relative pointer-events-none select-none ${className}`}
      aria-hidden="true"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="flex items-center justify-center rounded-2xl"
        style={{
          width: 64,
          height: 64,
          background: "linear-gradient(135deg, rgba(0,212,255,0.16), rgba(59,130,246,0.10))",
          border: "1px solid rgba(0,212,255,0.3)",
          boxShadow: "0 8px 28px rgba(0,212,255,0.12)",
        }}
      >
        <motion.div
          animate={{ opacity: [1, 0.25, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Bot size={30} strokeWidth={1.6} className="text-cyan-300" />
        </motion.div>
      </div>
      {/* antenna blip */}
      <motion.span
        className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-300"
        animate={{ opacity: [1, 0.15, 1], scale: [1, 1.4, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

/* ─── Animated Counter ────────────────────────────────────────────────── */
interface CounterProps {
  to: number;
  suffix?: string;
  duration?: number;
}

function Counter({ to, suffix = "", duration = 2000 }: CounterProps) {
  const [val, setVal] = useState<number>(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: DOMHighResTimeStamp) => {
            const pct = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - pct, 3);
            setVal(Math.round(ease * to));
            if (pct < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ─── WhatsApp Floating Button ────────────────────────────────────────── */
function WhatsAppFloat() {
  // +49 15511049025
  const phoneNumber = "4915511049025";
  const message = "Hi! I'd like to know more about your AI automation & training programs.";
  const href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.2 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed z-50 bottom-6 right-6 sm:bottom-8 sm:right-8 flex items-center justify-center"
      style={{ width: 60, height: 60 }}
    >
      {/* Pulse ring */}
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ background: "rgba(37,211,102,0.45)" }}
        animate={{ scale: [1, 1.6, 1.6], opacity: [0.6, 0, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
      />
      {/* Button */}
      <div
        className="relative flex items-center justify-center w-full h-full rounded-full"
        style={{
          background: "linear-gradient(135deg, #25D366 0%, #1EBE57 100%)",
          boxShadow: "0 8px 28px rgba(37,211,102,0.45), 0 0 0 1px rgba(255,255,255,0.08)",
        }}
      >
        <MessageCircle size={28} strokeWidth={2} className="text-white" fill="white" fillOpacity={0.08} />
      </div>

      {/* Tooltip label, desktop only */}
      <span
        className="hidden md:block absolute right-full mr-3 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-display font-semibold text-white opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        style={{
          background: "rgba(6,9,15,0.95)",
          border: "1px solid rgba(37,211,102,0.3)",
        }}
      >
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}

/* ─── Ticker ──────────────────────────────────────────────────────────── */
const tickerItems = [
  "Predictive Maintenance",
  "Industrial IoT",
  "Embedded AI",
  "Real-Time Monitoring",
  "Digital Twin",
  "Smart Factories",
  "Edge Computing",
  "Autonomous Systems",
];

function Ticker() {
  return (
    <div className="overflow-hidden border-y border-white/10 py-3 bg-slate-950/60 backdrop-blur-sm">
      <motion.div
        className="flex gap-16 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {[...tickerItems, ...tickerItems].map((item, i) => (
          <span key={i} className="text-xs font-semibold tracking-widest text-cyan-400/70 uppercase flex items-center gap-4">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Main Hero ───────────────────────────────────────────────────────── */
interface Service {
  icon: LucideIcon;
  label: string;
  desc: string;
  stat: string;
}

const services: Service[] = [
  {
    icon: Cpu,
    label: "Predictive Maintenance",
    desc: "Detect mechanical failures weeks before they occur. Our ML models analyze vibration, thermal, and acoustic data streams to eliminate unplanned downtime.",
    stat: "94% accuracy",
  },
  {
    icon: BrainCircuit,
    label: "Industrial AI",
    desc: "Embedded decision-intelligence for production lines. From quality inspection to yield optimization — running directly on edge hardware.",
    stat: "3ms inference",
  },
  {
    icon: Factory,
    label: "Industry 5.0",
    desc: "Human-centric automation where operators and machines collaborate. Ergonomic interfaces, real-time feedback loops, and adaptive workflows.",
    stat: "Zero retraining",
  },
  {
    icon: Shield,
    label: "Functional Safety",
    desc: "IEC 61508 and ISO 13849 compliant systems. We design fail-safe architectures for hazardous industrial environments where reliability is non-negotiable.",
    stat: "SIL 3 rated",
  },
];

interface ProcessStep {
  title: string;
  desc: string;
}

const processSteps: ProcessStep[] = [
  {
    title: "Sensor Integration",
    desc: "We map your existing sensor infrastructure and identify critical measurement points across your production environment.",
  },
  {
    title: "Model Training",
    desc: "Domain-specific AI models are trained on your historical operational data, calibrated to your exact equipment and failure modes.",
  },
  {
    title: "Edge Deployment",
    desc: "Compiled models are deployed to hardened edge nodes inside your facility — no cloud dependency, no latency, no data leaving your plant.",
  },
  {
    title: "Continuous Learning",
    desc: "The system refines itself with every operational cycle, improving accuracy and adapting to equipment aging and process drift.",
  },
];

const clients: string[] = [
  "Siemens", "Bosch", "ABB", "Schneider Electric", "Rockwell", "Honeywell"
];

export default function Hero() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 60]);
  const [activeService, setActiveService] = useState<number>(0);

  return (
    <div className="bg-[#06090F] text-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .text-balance { text-wrap: balance; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .float { animation: float 6s ease-in-out infinite; }
        .float-delay { animation: float 6s ease-in-out 2s infinite; }
        
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .scan-line {
          animation: scan 4s linear infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        .blink { animation: blink 1.8s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .float, .float-delay, .blink, .scan-line { animation: none !important; }
        }

        .seo-card {
          transition: border-color 0.35s ease, box-shadow 0.35s ease, background 0.35s ease, transform 0.35s ease;
        }
        .seo-card:hover {
          border-color: rgba(255, 200, 0, 0.5) !important;
          box-shadow: 0 0 45px rgba(255, 200, 0, 0.14), 0 22px 45px rgba(0,0,0,0.35) !important;
          background: linear-gradient(135deg, rgba(255, 200, 0, 0.07) 0%, rgba(13,21,32,0.7) 100%) !important;
        }
        .seo-card:hover .seo-card-title {
          color: #FFD84D !important;
        }
        .seo-card:hover .seo-card-bar {
          background: linear-gradient(90deg, #FFD84D, #FFB800) !important;
          box-shadow: 0 0 12px rgba(255, 200, 0, 0.5);
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">

        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          {/* Radial glows */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-700/8 blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-slate-800/30 blur-[80px]" />
          {/* Scan line */}
          <div
            className="scan-line absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
            style={{ top: 0 }}
          />
          {/* Ambient gear cluster, background only, hidden on small screens */}
          <div className="hidden lg:block absolute top-24 right-[8%] opacity-70">
            <SpinningGearCluster />
          </div>
          {/* Drifting particles for ambient atmosphere */}
          <ParticleField count={16} />
        </div>

        {/* Ticker */}
        <Ticker />

        {/* Main content */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 flex-1 max-w-[1400px] mx-auto w-full px-6 md:px-10 lg:px-16 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20 lg:py-24 text-center lg:text-center"
        >
          {/* Left column */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-cyan-400/25 bg-cyan-400/8 px-4 py-2 mb-8"
            >
              <span className="blink w-2 h-2 rounded-full bg-cyan-400 inline-block" />
              <span className="text-xs font-semibold tracking-widest text-cyan-300 uppercase font-display">
                Industry 5.0 Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[82px] font-black leading-[1.05] tracking-tight text-balance text-center"
            >
              <span className="text-white">Where</span>
              <br />
              <span
                className="relative inline-block"
                style={{
                  background: "linear-gradient(135deg, #00D4FF 0%, #3B82F6 50%, #818CF8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Machines Predict
              </span>
              <br />
              <span className="text-white">Humans Decide</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8 text-sm sm:text-base lg:text-lg text-slate-400 leading-relaxed max-w-[520px] mx-auto font-body text-center"
            >
              We build AI-powered predictive maintenance, embedded intelligence,
              and industrial automation systems for manufacturers who cannot
              afford failure. From sensor to decision — fully integrated.
            </motion.p>

            {/* CTA Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap gap-4 justify-center"
            >
              <Link
                href="/services"
                className="group flex items-center gap-2.5 rounded-xl font-display font-semibold text-sm px-7 py-4 bg-cyan-400 text-slate-950 hover:bg-white transition-all duration-200"
              >
                Explore Platform
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/contact"
                className="group flex items-center gap-2 rounded-xl border border-white/15 px-7 py-4 text-sm font-display font-semibold text-slate-200 hover:border-cyan-400/40 hover:bg-cyan-400/5 transition-all duration-200"
              >
                Book a Demo
                <ArrowUpRight size={14} className="opacity-60 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
            </motion.div>

            {/* Stat strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-14 pt-8 border-t border-white/8 grid grid-cols-3 gap-4 sm:gap-6 w-full max-w-md mx-auto"
            >
              {[
                { n: 12, s: "+", l: "Deployments" },
                { n: 98, s: "%", l: "Uptime SLA" },
               
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="font-display text-xl sm:text-2xl md:text-3xl font-black text-white">
                    <Counter to={item.n} suffix={item.s} />
                  </div>
                  <div className="mt-1 text-[10px] sm:text-xs text-slate-500 font-body tracking-wide">{item.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column — Neural Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative mx-auto w-full max-w-[520px]"
          >
            {/* Main card */}
            <div
              className="relative rounded-2xl overflow-hidden float"
              style={{
                border: "1px solid rgba(0, 212, 255, 0.15)",
                background: "linear-gradient(135deg, rgba(13,27,42,0.95) 0%, rgba(6,9,15,0.98) 100%)",
                boxShadow: "0 0 60px rgba(0,212,255,0.08), 0 40px 80px rgba(0,0,0,0.5)",
              }}
            >
              {/* Header bar */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/8 bg-slate-900/50">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400/70" />
                <span className="ml-3 text-xs text-slate-500 font-body tracking-wider">NEXUS.AI — Neural Monitor</span>
                <div className="ml-auto flex items-center gap-1.5 text-xs text-cyan-400/70 font-body">
                  <Activity size={11} />
                  LIVE
                </div>
              </div>

              {/* Canvas */}
              <div className="h-56 sm:h-64 md:h-80 relative">
                <NeuralCanvas />
                {/* Overlay labels */}
                <div className="absolute top-4 left-4 text-[10px] font-display font-semibold tracking-widest text-cyan-400/50 uppercase">
                  Neural Network — Active
                </div>
                <div className="absolute bottom-4 right-4 text-[10px] font-display font-semibold tracking-widest text-slate-600 uppercase">
                  28 Nodes · Real-time
                </div>
                {/* Robot buddy riding inside the panel */}
                <div className="absolute bottom-4 left-4">
                  <RobotBuddy />
                </div>
              </div>

              {/* Metrics row */}
              <div className="grid grid-cols-3 divide-x divide-white/8 border-t border-white/8">
                {[
                  { label: "CPU Load", value: "12%", color: "text-cyan-400" },
                  { label: "Inference", value: "3.2ms", color: "text-blue-400" },
                  { label: "Accuracy", value: "98.4%", color: "text-emerald-400" },
                ].map((m, i) => (
                  <div key={i} className="px-3 sm:px-5 py-4 text-center">
                    <div className={`font-display font-bold text-sm sm:text-base ${m.color}`}>{m.value}</div>
                    <div className="text-[9px] sm:text-[10px] text-slate-600 mt-0.5 font-body tracking-wide uppercase">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="float-delay hidden sm:flex absolute -left-6 top-1/3 rounded-xl px-4 py-3 text-xs font-display font-bold text-emerald-400 items-center gap-2"
              style={{
                background: "linear-gradient(135deg, rgba(16,30,22,0.95) 0%, rgba(6,9,15,0.98) 100%)",
                border: "1px solid rgba(52,211,153,0.2)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <TrendingUp size={14} />
              Anomaly Detected — Bearing 4B
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="float hidden sm:flex absolute -right-4 bottom-24 rounded-xl px-4 py-3 text-xs font-display font-bold text-cyan-300 items-center gap-2"
              style={{
                background: "linear-gradient(135deg, rgba(10,25,40,0.95) 0%, rgba(6,9,15,0.98) 100%)",
                border: "1px solid rgba(0,212,255,0.2)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <Zap size={14} />
              Maintenance Alert — 14 days
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── CLIENT LOGOS ──────────────────────────────────────── */}
      <section className="border-y border-white/6 py-10 bg-slate-950/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 text-center">
          <p className="text-center text-xs font-display font-semibold tracking-widest text-slate-600 uppercase mb-8">
            Trusted by Industrial Leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 sm:gap-x-14 gap-y-6">
            {clients.map((name, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="font-display font-bold text-base sm:text-lg text-slate-700 hover:text-slate-400 transition-colors duration-300 cursor-default tracking-tight"
              >
                {name}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────── */}
      <section className="py-24 lg:py-36 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-cyan-500/4 blur-[100px] -translate-y-1/2" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 lg:mb-20 flex flex-col items-center"
            style={{ width: "100%", maxWidth: "640px", margin: "0 auto", textAlign: "center" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3.5 py-1.5 mb-5">
              <span className="text-xs font-display font-semibold text-cyan-400 tracking-widest uppercase">What We Build</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-white" style={{ textAlign: "center", width: "100%" }}>
              Engineered for
              <span
                className="block"
                style={{
                  background: "linear-gradient(135deg, #00D4FF, #3B82F6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Zero Tolerance
              </span>
            </h2>
            <p className="mt-5 text-slate-400 font-body text-sm sm:text-base lg:text-lg leading-relaxed">
              Every system we deliver operates in environments where failure is not an option.
              We build with that constraint as our foundation, not an afterthought.
            </p>
          </motion.div>

          {/* Service grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  onMouseEnter={() => setActiveService(i)}
                  className="group relative rounded-2xl p-7 sm:p-8 cursor-pointer transition-all duration-300 flex flex-col items-center text-center"
                  style={{
                    background: activeService === i
                      ? "linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(59,130,246,0.04) 100%)"
                      : "rgba(13,21,32,0.6)",
                    border: activeService === i
                      ? "1px solid rgba(0,212,255,0.25)"
                      : "1px solid rgba(255,255,255,0.06)",
                    boxShadow: activeService === i ? "0 0 40px rgba(0,212,255,0.06)" : "none",
                  }}
                >
                  <div className="flex items-center justify-center mb-6">
                    <div
                      className="p-3 rounded-xl transition-colors duration-300"
                      style={{
                        background: activeService === i
                          ? "rgba(0,212,255,0.15)"
                          : "rgba(255,255,255,0.05)",
                      }}
                    >
                      <Icon
                        size={22}
                        className="transition-colors duration-300"
                        style={{ color: activeService === i ? "#00D4FF" : "#4B5E7A" }}
                      />
                    </div>
                  </div>
                  <span
                    className="text-xs font-display font-bold tracking-wider rounded-full px-3 py-1 mb-4 transition-colors duration-300"
                    style={{
                      background: activeService === i ? "rgba(0,212,255,0.12)" : "rgba(255,255,255,0.04)",
                      color: activeService === i ? "#00D4FF" : "#4B5E7A",
                    }}
                  >
                    {svc.stat}
                  </span>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-3">{svc.label}</h3>
                  <p className="font-body text-sm text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors duration-300">
                    {svc.desc}
                  </p>
                  <div
                    className="mt-6 flex items-center justify-center gap-2 text-xs font-display font-semibold tracking-wide transition-all duration-300"
                    style={{ color: activeService === i ? "#00D4FF" : "#334155" }}
                  >
                    Learn more
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Decorative gear + robot strip */}
          <div className="mt-16 flex items-center justify-center gap-10 opacity-90">
            <Gear size={100} duration={9} color="rgba(0,212,255,0.45)" glow="rgba(0,212,255,0.3)" />
            <RobotBuddy />
            <Gear size={78} duration={6} reverse color="rgba(129,140,248,0.5)" glow="rgba(129,140,248,0.3)" />
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────── */}
      <section className="py-24 lg:py-36 relative overflow-hidden">
        <div className="hidden md:block absolute top-10 left-[4%] opacity-70">
          <Gear size={120} duration={11} color="rgba(0,212,255,0.4)" glow="rgba(0,212,255,0.3)" />
        </div>
        <div className="hidden md:block absolute bottom-10 right-[4%] opacity-70">
          <Gear size={96} duration={8} reverse color="rgba(129,140,248,0.45)" glow="rgba(129,140,248,0.3)" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-10 flex flex-col items-center"
            style={{ width: "100%", maxWidth: "640px", margin: "0 auto", textAlign: "center" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3.5 py-1.5 mb-5">
              <span className="text-xs font-display font-semibold text-cyan-400 tracking-widest uppercase">How It Works</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black leading-[1.1] tracking-tight text-white" style={{ textAlign: "center", width: "100%" }}>
              From Installation to Intelligence
            </h2>
            <p className="mt-5 text-slate-400 font-body text-sm sm:text-base leading-relaxed" style={{ textAlign: "center" }}>
              A structured engagement process that takes your facility from raw sensor data
              to operational AI in eight weeks, with zero production disruption.
            </p>
          </motion.div>

          {/* Robotic arm centerpiece */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center mb-16 lg:mb-20"
          >
            <div
              className="relative rounded-2xl overflow-hidden w-full max-w-[420px]"
              style={{
                border: "1px solid rgba(0,212,255,0.2)",
                boxShadow: "0 0 50px rgba(0,212,255,0.1), 0 30px 60px rgba(0,0,0,0.5)",
              }}
            >
              <video
                src="/tri.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto block"
              />
            </div>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div
              className="hidden lg:block absolute top-9 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.2), rgba(59,130,246,0.2), transparent)" }}
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step number */}
                  <div className="relative flex items-center justify-center w-[52px] h-[52px] mb-6">
                    <motion.span
                      className="absolute inset-0 rounded-full"
                      style={{ border: "1px solid rgba(0,212,255,0.35)" }}
                      animate={{ scale: [1, 1.5, 1.5], opacity: [0.6, 0, 0] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: i * 0.4 }}
                    />
                    <div className="relative z-10 flex items-center justify-center w-full h-full rounded-full"
                      style={{
                        background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(59,130,246,0.1))",
                        border: "1px solid rgba(0,212,255,0.25)",
                      }}
                    >
                      <span className="font-display font-black text-base text-cyan-400">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mb-3">{step.title}</h3>
                  <p className="font-body text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-[1400px] mx-auto relative overflow-hidden rounded-3xl p-10 sm:p-12 md:p-16 lg:p-20 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(59,130,246,0.06) 50%, rgba(129,140,248,0.06) 100%)",
            border: "1px solid rgba(0,212,255,0.15)",
          }}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-cyan-500/6 blur-[80px]" />
          </div>

          <div className="relative flex flex-col items-center">
            <div className="mb-4 flex items-center justify-center gap-4">
              <RobotBuddy />
              <Gear size={70} duration={7} color="rgba(0,212,255,0.5)" glow="rgba(0,212,255,0.3)" />
            </div>
            <p className="font-display text-xs font-bold tracking-widest text-cyan-400 uppercase mb-4">
              Ready to Eliminate Downtime
            </p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.15] mb-6 text-balance">
              Your next unplanned outage<br />is the last one.
            </h2>
            <p className="font-body text-slate-400 text-sm sm:text-base max-w-lg mx-auto mb-10 leading-relaxed">
              Talk to an industrial AI engineer about your specific environment.
              We scope every project individually — no templates, no off-the-shelf demos.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="group flex items-center gap-2.5 rounded-xl font-display font-bold text-sm px-8 py-4 bg-cyan-400 text-slate-950 hover:bg-white transition-all duration-200"
              >
                Schedule Engineering Call
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/case-studies"
                className="rounded-xl border border-white/12 px-8 py-4 text-sm font-display font-semibold text-slate-300 hover:border-white/25 hover:bg-white/5 transition-all duration-200"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── SEO CONTENT ───────────────────────────────────────── */}
      <section className="py-24 lg:py-32 relative overflow-hidden border-t border-white/6" style={{ width: "100%" }}>
        <div
          className="relative px-6 md:px-10 lg:px-16"
          style={{ width: "100%", maxWidth: 1100, marginLeft: "auto", marginRight: "auto", boxSizing: "border-box" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-14 flex flex-col items-center text-center"
            style={{ width: "100%" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3.5 py-1.5 mb-5">
              <span className="text-xs font-display font-semibold text-cyan-400 tracking-widest uppercase">Learn With Us</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black leading-[1.1] tracking-tight text-white text-center">
              AI Automation & Embedded Systems Training
              <span
                className="block"
                style={{
                  background: "linear-gradient(135deg, #00D4FF, #3B82F6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                For Industry 4.0 to 5.0
              </span>
            </h2>
          </motion.div>

          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
            style={{ width: "100%" }}
          >
            {[
              {
                title: "AI Automation Training",
                body: "Our AI automation courses take students from the fundamentals of machine learning to deploying real predictive-maintenance and computer-vision models on live industrial hardware. Every module is built around problems manufacturers actually pay to solve — anomaly detection, quality inspection, and process optimization — so graduates leave with a portfolio, not just a certificate.",
              },
              {
                title: "Embedded Systems for Industrial AI",
                body: "Embedded systems are the bridge between AI models and the physical world. Students learn microcontroller programming, sensor integration, real-time operating systems, and how to compile and deploy trained models onto edge devices — the same edge-AI stack used in modern smart factories.",
              },
              {
                title: "Industry 4.0 to Industry 5.0: The Transition",
                body: "Industry 4.0 connected machines to data. Industry 5.0 puts humans back at the center of that data-driven factory — collaborative robots, adaptive workflows, and AI systems designed to support operators rather than replace them. Our curriculum walks students through this shift step by step, from IIoT basics through to human-centric automation design.",
              },
              {
                title: "Training for Students in Germany & Kerala",
                body: "Engineering and technical students in Germany get access to German-standard industrial training — practical, compliance-aware, and aligned with what local manufacturers look for in graduates and working students. For students in Kerala, the same German-engineered curriculum is delivered online at a fraction of the cost of studying abroad — no relocation required, mentorship from engineers with real industrial project experience, and a certificate that speaks to international standards.",
              },
              {
                title: "Affordable Online Courses",
                body: "Studying AI automation and embedded systems shouldn't require an expensive campus or relocation. Our courses are live and self-paced, project-based, and priced for students — among the most affordable AI automation and embedded systems courses available online, with instalment options and student discounts. Every course ends in a deployable mini-project and a completion certificate recognized for internships and entry-level industrial roles.",
                span: true,
              },
            ].map((block, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className={`seo-card flex flex-col items-center text-center rounded-2xl p-7 sm:p-8 ${block.span ? "lg:col-span-2" : ""}`}
                style={{
                  background: "rgba(13,21,32,0.6)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <h3 className="seo-card-title font-display font-bold text-xl sm:text-2xl text-white text-center transition-colors duration-300">
                  {block.title}
                </h3>
                <motion.span
                  className="seo-card-bar block h-[2px] rounded-full mt-3 mb-5"
                  style={{ background: "linear-gradient(90deg, #00D4FF, #818CF8)" }}
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 + 0.2 }}
                />
                <p className="font-body text-sm sm:text-base text-slate-400 leading-relaxed text-center">
                  {block.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHATSAPP FLOATING BUTTON ──────────────────────────── */}
      <WhatsAppFloat />

    </div>
  );
}