"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const studies = [
  {
    company: "E-trnl Energy Pvt Ltd",
    challenge: "Machine reconfiguration for cell manufacturing.",
    result: "70% reduction in changeover time.",
  },
  {
    company: "Bharat FIH",
    challenge: "Reactive maintenance on 10,000+ machines.",
    result: "Reduced downtime and maintenance costs.",
  },
];

export default function CaseStudies() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold">
            Industry Case Studies
          </h2>

          <p className="text-gray-400 mt-5">
            Real industrial success powered by AI and automation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {studies.map((study, index) => (
            <motion.div
              key={study.company}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-10"
            >
              <TrendingUp
                size={40}
                className="text-cyan-400 mb-6"
              />

              <h3 className="text-3xl font-bold mb-6">
                {study.company}
              </h3>

              <p className="text-gray-400 mb-4">
                <strong className="text-white">Challenge:</strong>{" "}
                {study.challenge}
              </p>

              <p className="text-cyan-400 font-semibold text-lg">
                {study.result}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}