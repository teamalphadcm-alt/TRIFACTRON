import { BrainCircuit, Target, Eye, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}

      <section className="pt-40 pb-24 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-6">

          <span className="text-cyan-400 font-semibold uppercase">
            About Trifactron
          </span>

          <h1 className="text-6xl font-black mt-6 max-w-4xl leading-tight">
            Building Intelligent Tools
            <span className="block text-cyan-400">
              for Industry 5.0
            </span>
          </h1>

          <p className="text-gray-400 text-xl mt-8 max-w-3xl leading-9">
            Trifactron combines Artificial Intelligence,
            Mechatronics, Embedded Systems and Industrial
            Automation to create intelligent manufacturing
            solutions that reduce downtime, improve efficiency
            and empower human decision-making.
          </p>

        </div>
      </section>

      {/* Founder */}

      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

          <div className="aspect-square rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-8xl font-black">
            A
          </div>

          <div>

            <h2 className="text-5xl font-bold">
              Aswin Anthikkad Vinoy
            </h2>

            <p className="text-cyan-400 text-xl mt-2">
              Founder • Automation Engineer
            </p>

            <div className="mt-8 space-y-5 text-gray-300 text-lg">

              <p>
                ✓ Master's Student in Mechatronics
                (KIT Germany)
              </p>

              <p>
                ✓ AI Driven Industrial Solutions
              </p>

              <p>
                ✓ 3+ Years Automation Engineering
              </p>

              <p>
                ✓ Industrial Mentor
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* Mission Vision */}

      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-8">

          <div className="rounded-3xl border border-white/10 p-10 bg-white/5">
            <Target className="text-cyan-400 mb-6" size={40}/>
            <h3 className="text-3xl font-bold mb-5">
              Mission
            </h3>

            <p className="text-gray-400 leading-8">
              Empower manufacturers with AI-driven predictive
              technologies that eliminate downtime and improve
              productivity.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 p-10 bg-white/5">
            <Eye className="text-cyan-400 mb-6" size={40}/>
            <h3 className="text-3xl font-bold mb-5">
              Vision
            </h3>

            <p className="text-gray-400 leading-8">
              Become the global benchmark for
              Industry 5.0 intelligent automation.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 p-10 bg-white/5">
            <Award className="text-cyan-400 mb-6" size={40}/>
            <h3 className="text-3xl font-bold mb-5">
              Core Values
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>Innovation</li>
              <li>Engineering Excellence</li>
              <li>Integrity</li>
              <li>Sustainability</li>
              <li>Customer Centricity</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Timeline */}

      <section className="py-24 bg-slate-900">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-center text-5xl font-bold mb-20">
            Our Journey
          </h2>

          <div className="grid md:grid-cols-4 gap-8">

            {[
              "Research",
              "Automation",
              "Artificial Intelligence",
              "Industry 5.0",
            ].map((step) => (
              <div
                key={step}
                className="rounded-2xl bg-white/5 border border-white/10 p-8 text-center"
              >
                <BrainCircuit
                  className="mx-auto text-cyan-400 mb-6"
                  size={36}
                />

                <h3 className="font-bold text-xl">
                  {step}
                </h3>

              </div>
            ))}

          </div>

        </div>
      </section>
    </>
  );
}