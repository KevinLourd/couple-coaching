"use client";

import { useState, useEffect, useRef } from "react";
import posthog from "posthog-js";

type Step = "form" | "done";

export function ContactModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<Step>("form");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const backdropRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef.current?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    posthog.capture("contact_form_submitted");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, message }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong");
        posthog.capture("contact_form_error", { error: data.error });
        return;
      }
      setStep("done");
      posthog.capture("contact_form_success");
    } catch {
      setError("Network error. Please try again.");
      posthog.capture("contact_form_error", { error: "network_error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
    >
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a0a] p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {step === "form" && (
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-2">Book a discovery call</h2>
            <p className="text-sm text-zinc-400 mb-6">
              Leave your email and I&apos;ll get back to you to schedule a free 1-hour call.
            </p>
            <input ref={emailRef} type="email" required placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500 transition-colors" />
            <input type="text" placeholder="First name (optional)" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500 transition-colors mt-3" />
            <textarea placeholder="Tell me briefly about your situation (optional)" value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500 transition-colors resize-none mt-3" />
            {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
            <button type="submit" disabled={loading} className="mt-4 w-full px-6 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors disabled:opacity-50">
              {loading ? "Sending..." : "Send message"}
            </button>
          </form>
        )}

        {step === "done" && (
          <div className="text-center py-4">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Thanks!</h2>
            <p className="text-sm text-zinc-400 mb-6">I&apos;ll get back to you soon to schedule our discovery call.</p>
            <button onClick={onClose} className="px-6 py-3 border border-white/20 rounded-full text-sm font-medium hover:bg-white/5 transition-colors">Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
