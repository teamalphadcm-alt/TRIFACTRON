"use client";

import CountUp from "react-countup";

const stats = [
  {
    number: 250,
    suffix: "+",
    title: "Hours Lost",
  },
  {
    number: 70,
    suffix: "%",
    title: "Reduction in Changeover",
  },
  {
    number: 60,
    suffix: "%",
    title: "Downtime Reduction",
  },
  {
    number: 30,
    suffix: "%",
    title: "Maintenance Cost Saved",
  },
];

export default function Stats() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-8">

          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center"
            >
              <h2 className="text-5xl font-black text-cyan-400">
                <CountUp
                  end={item.number}
                  duration={3}
                />
                {item.suffix}
              </h2>

              <p className="mt-4 text-gray-400">
                {item.title}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}