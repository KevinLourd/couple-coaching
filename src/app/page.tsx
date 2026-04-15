"use client";

import Image from "next/image";
import { Footer } from "@/components/footer";
import { useContactModal } from "@/components/contact-provider";

function BookCTA({ source }: { source: string }) {
  const { open } = useContactModal();

  return (
    <button
      onClick={() => open(source)}
      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors"
    >
      Book a free discovery call
    </button>
  );
}

export default function CoupleCoachingPage() {
  return (
    <div className="min-h-screen">
      {/* Minimal header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img
              src="/photos/kevin-portrait.jpg"
              alt="Kevin Lourd"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-zinc-300">
              Couple Coaching
            </span>
          </a>
          <a
            href="https://kevinlourd.com"
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            kevinlourd.com
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-600/10 via-transparent to-amber-600/10" />
        <div className="relative max-w-3xl mx-auto">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full overflow-hidden border-2 border-white/10">
            <Image
              src="/photos/kevin-portrait.jpg"
              alt="Kevin Lourd"
              width={96}
              height={96}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <p className="text-sm uppercase tracking-[0.3em] text-rose-400 mb-4">
            Couple Coaching
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Restore polarity.
            <br />
            Restore desire.
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Polarity-based coaching for individuals in a relationship.
            When the dynamic collapses, I help you see what shifted
            and rebuild from there.
          </p>
          <BookCTA source="couple_coaching_hero" />
        </div>
      </section>

      {/* The problem */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm uppercase tracking-[0.3em] text-rose-400 mb-4">
            What brings people here
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold mb-10">
            You love your partner. But something is off.
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "He\u2019s not present enough",
                description:
                  "She feels unseen, unheard, emotionally alone. He\u2019s distracted, avoidant, or overwhelmed. The feminine in her is starving for presence \u2014 and his masculine isn\u2019t holding the space.",
              },
              {
                title: "She\u2019s always dysregulated",
                description:
                  "Constant emotional storms, overthinking, chaos at home. He feels like nothing he does is enough. Her nervous system is in overdrive \u2014 and his groundedness isn\u2019t there to anchor it.",
              },
              {
                title: "The desire is gone",
                description:
                  "You get along fine. You\u2019re good partners. But the spark died. Polarity collapsed \u2014 you\u2019re in the same energy, and attraction follows polarity, not compatibility.",
              },
              {
                title: "He\u2019s not stepping up",
                description:
                  "Financially, emotionally, in decision-making. She\u2019s carrying the load and resenting it. His masculine needs direction and structure \u2014 not motivation speeches.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
              >
                <h4 className="text-zinc-200 font-medium mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The approach */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm uppercase tracking-[0.3em] text-rose-400 mb-4">
            How I work
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Analytical. Trauma-informed. Polarity-based.
          </h3>
          <div className="space-y-6 text-zinc-400 leading-relaxed max-w-3xl">
            <p>
              I don&apos;t do traditional couples therapy. I work with{" "}
              <strong className="text-zinc-200">one person at a time</strong> &mdash;
              the individual in the relationship &mdash; and I decompose the dynamic
              along the masculine-feminine axis.
            </p>
            <p>
              Where did the polarity invert? Where is the masculine not
              integrated? Where is the feminine not expressed? What collapsed,
              and why did desire fade?
            </p>
            <p>
              From there, I build a{" "}
              <strong className="text-zinc-200">
                prioritized action plan with measurable results
              </strong>
              . This isn&apos;t abstract energy talk &mdash; it&apos;s concrete
              shifts you can practice between sessions and see the effects of
              in your relationship.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-10">
            {[
              {
                label: "Non-judgmental listening",
                detail:
                  "A space where you can share anything \u2014 without filter, without shame.",
              },
              {
                label: "Polarity assessment",
                detail:
                  "I identify where each partner sits on the polarity spectrum and what shifted.",
              },
              {
                label: "Concrete action plan",
                detail:
                  "Prioritized steps you practice between sessions, with visible results.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]"
              >
                <div className="text-sm text-zinc-200 font-medium mb-1">
                  {item.label}
                </div>
                <div className="text-xs text-zinc-500">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm uppercase tracking-[0.3em] text-rose-400 mb-4">
            Why me
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold mb-10">
            35+ years of practice, not theory.
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { value: "35+", label: "years of polarity practice" },
              { value: "100+", label: "workshops facilitated" },
              { value: "1,000+", label: "community members led" },
              { value: "50+", label: "countries visited" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center"
              >
                <div className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-amber-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              "Certified Trauma-Informed Care Practitioner",
              "Certified Trauma-Informed Tantra Practitioner",
              "ISTA Practitioner Training",
              "Right Use of Power Practitioner",
              "Restorative Justice Practitioner",
              "Nonviolent Communication (NVC)",
              "Vipassana & Buddhist Practice",
            ].map((cert) => (
              <span
                key={cert}
                className="px-3 py-1 text-xs rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm uppercase tracking-[0.3em] text-rose-400 mb-4">
            Pricing
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Always starts with a free call.
          </h3>
          <p className="text-zinc-400 mb-10 max-w-2xl">
            We begin with a 1-hour discovery call &mdash; free, no commitment.
            If we&apos;re a good fit, we go from there.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Single session",
                price: "150",
                unit: "/ hour",
                detail: "Pay as you go. No commitment.",
                savings: null,
              },
              {
                name: "10-hour package",
                price: "1,350",
                unit: "",
                detail: "10 sessions of 1 hour each.",
                savings: "Save 10%",
              },
              {
                name: "20-hour package",
                price: "2,400",
                unit: "",
                detail: "20 sessions of 1 hour each.",
                savings: "Save 20%",
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col"
              >
                <div className="text-sm text-zinc-200 font-medium mb-4">
                  {tier.name}
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold text-white">
                    &euro;{tier.price}
                  </span>
                  {tier.unit && (
                    <span className="text-sm text-zinc-500">{tier.unit}</span>
                  )}
                </div>
                {tier.savings && (
                  <span className="inline-block text-xs text-emerald-400 mb-3">
                    {tier.savings}
                  </span>
                )}
                <p className="text-xs text-zinc-500 mt-auto">{tier.detail}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-zinc-600 mt-6">
            All sessions are via video call. No online payment &mdash; we discuss
            logistics after the discovery call.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 text-center border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Ready to talk?</h2>
          <p className="text-zinc-400 mb-8">
            Book a free 1-hour discovery call. No commitment, no pressure.
          </p>
          <BookCTA source="couple_coaching_footer" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
