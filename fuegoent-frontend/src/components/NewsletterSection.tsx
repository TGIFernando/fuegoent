"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="bg-[#0a0a0a] border-t border-white/10 py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-widest text-white mb-3">
          Stay in the Loop
        </h2>
        <p className="text-white/60 text-sm tracking-wide mb-10">
          Be the first to know about our Upcoming Events!
        </p>

        {submitted ? (
          <p className="text-orange-400 font-[family-name:var(--font-display)] text-2xl tracking-widest">
            You&apos;re on the list!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email *"
                required
                className="flex-1 bg-white/5 border border-white/15 rounded px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-orange-500/60 transition-colors"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number *"
                required
                className="flex-1 bg-white/5 border border-white/15 rounded px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-orange-500/60 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto sm:self-center mt-1 px-10 py-3 bg-white text-black text-sm font-semibold tracking-widest uppercase hover:bg-orange-400 hover:text-white transition-all duration-200"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
