"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Target, Eye, Award } from "lucide-react";

// ---------------------------------------------------------------------------
// SEO NOTE: this file uses "use client" for Framer Motion, so it can't export
// `metadata` directly (that requires a server component). Add this block to
// app/about/layout.tsx (or wrap this page in a small server layout) so the
// About page gets its own title/description instead of inheriting the site's:
//
// export const metadata = {
//   title: "About Trifactron | AI Automation & Embedded Systems, Germany & Kerala",
//   description:
//     "Trifactron builds AI-driven industrial automation and embedded systems solutions, and delivers affordable, industry-relevant training for students in Germany and India.",
// };
// ---------------------------------------------------------------------------

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const founders = [
  {
    name: "Aswin Anthikkad Vinoy",
    role: "Founder • Automation Engineer",
    image: "/Aswin.jpeg",
    bio: "Aswin leads Trifactron's engineering direction, bringing together AI, mechatronics and industrial automation to solve real production-floor problems. He is currently pursuing his Master's in Mechatronics at KIT, Germany, and has spent 3+ years building automation solutions and mentoring students entering the field.",
    points: [
      "Master's Student in Mechatronics (KIT, Germany)",
      "AI-Driven Industrial Solutions",
      "3+ Years Automation Engineering",
      "Industrial Mentor",
    ],
  },
  {
    name: "Anakha S",
    role: "Co-Founder • Embedded Systems Engineer",
    image: "/Anakha.jpeg",
    reverse: true,
    bio: "Anakha leads embedded systems development at Trifactron, turning automation concepts into working hardware. With a B.Tech in Mechatronics and 2+ years of industrial experience, she specializes in embedded design and hardware-software integration for intelligent manufacturing systems.",
    points: [
      "B.Tech in Mechatronics",
      "2+ Years Industrial Experience",
      "Embedded Systems Design",
      "Hardware-Software Integration",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
        {/* ambient glow, purely decorative */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-32 w-[36rem] h-[36rem] rounded-full bg-cyan-500/10 blur-3xl"
        />

        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.span
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-cyan-400 font-semibold uppercase tracking-wide text-sm sm:text-base"
          >
            About Trifactron
          </motion.span>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-black mt-6 max-w-4xl leading-tight"
          >
            Building Intelligent Tools
            <span className="block text-cyan-400">for Industry 5.0</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
            className="text-gray-400 text-base sm:text-lg lg:text-xl mt-8 max-w-3xl leading-8 sm:leading-9"
          >
            Trifactron combines Artificial Intelligence, Mechatronics, Embedded
            Systems and Industrial Automation to create intelligent
            manufacturing solutions that reduce downtime, improve efficiency
            and empower human decision-making. Based between Germany and
            India, we help manufacturers modernize their production lines
            and help students build careers in AI-driven automation.
          </motion.p>
        </div>
      </section>

      {/* Founders */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-16"
          >
            Meet the Team
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid gap-8 lg:gap-10"
          >
            {founders.map((person) => (
              <motion.div
                key={person.name}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className={`rounded-3xl border border-white/10 bg-white/5 p-8 flex flex-col ${
                  person.reverse ? "sm:flex-row-reverse" : "sm:flex-row"
                } gap-8 items-center hover:border-cyan-400/40 transition-colors duration-300`}
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative w-full sm:w-1/3 aspect-square rounded-2xl overflow-hidden ring-1 ring-white/10 shrink-0"
                >
                  <Image
                    src={person.image}
                    alt={`${person.name}, ${person.role} at Trifactron`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    style={{ objectFit: "cover", objectPosition: "top" }}
                  />
                </motion.div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold">
                    {person.name}
                  </h3>

                  <p className="text-cyan-400 text-base sm:text-lg mt-2">
                    {person.role}
                  </p>

                  <p className="text-gray-400 leading-7 mt-4">{person.bio}</p>

                  <div className="mt-6 space-y-3 text-gray-300 text-base sm:text-lg">
                    {person.points.map((point) => (
                      <p key={point} className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">✓</span>
                        <span>{point}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Vision */}
      <section className="py-24 bg-slate-950">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            {
              icon: Target,
              title: "Mission",
              body: "Empower manufacturers with AI-driven predictive technologies that eliminate downtime and improve productivity.",
            },
            {
              icon: Eye,
              title: "Vision",
              body: "Become the global benchmark for Industry 5.0 intelligent automation.",
            },
            {
              icon: Award,
              title: "Core Values",
              list: [
                "Innovation",
                "Engineering Excellence",
                "Integrity",
                "Sustainability",
                "Customer Centricity",
              ],
            },
          ].map((card) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-white/10 p-8 sm:p-10 bg-white/5 hover:border-cyan-400/40 hover:bg-white/[0.07] transition-colors duration-300"
            >
              <card.icon className="text-cyan-400 mb-6" size={40} />
              <h3 className="text-2xl sm:text-3xl font-bold mb-5">
                {card.title}
              </h3>

              {card.body && (
                <p className="text-gray-400 leading-7 sm:leading-8">
                  {card.body}
                </p>
              )}

              {card.list && (
                <ul className="space-y-3 text-gray-400">
                  {card.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

    </>
  );
}