"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  BrainCircuit,
  Factory,
  Activity,
  Gauge,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Predictive Intelligence",
    description:
      "AI continuously monitors machine health to predict failures before they occur.",
  },
  {
    icon: BrainCircuit,
    title: "AI Analytics",
    description:
      "Advanced machine learning transforms industrial data into actionable insights.",
  },
  {
    icon: Factory,
    title: "Industry 5.0",
    description:
      "AI-centric automation that combines intelligent machines with skilled operators.",
  },
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    description:
      "Monitor vibration, temperature, current and production metrics live.",
  },
  {
    icon: Gauge,
    title: "Performance Optimization",
    description:
      "Increase productivity while reducing maintenance costs and downtime.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Automation",
    description:
      "Scalable industrial automation built for modern manufacturing environments.",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold">
            Why Choose
            <span className="text-cyan-400"> Trifactron</span>
          </h2>

          <p className="mt-6 text-gray-400 max-w-3xl mx-auto">
            We combine Artificial Intelligence, Mechatronics,
            Embedded Systems and Industrial Automation to
            transform manufacturing into intelligent,
            predictive environments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 hover:border-cyan-400 transition"
              >
                <div className="w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-6">
                  <Icon className="text-cyan-400" size={30} />
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-400 leading-8">
                  {item.description}
                </p>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}