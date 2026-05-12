"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";

export default function BoothInquiryPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    comment: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email) setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />

      <section className="flex-1 pt-32 pb-16 md:pt-40 md:pb-24 px-4">
        <div className="max-w-xl mx-auto">
          {/* Heading */}
          <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl tracking-widest text-white text-center mb-12">
            Booth Inquiry
          </h1>

          {submitted ? (
            <div className="text-center py-16">
              <p className="font-[family-name:var(--font-display)] text-3xl tracking-widest text-orange-400 mb-3">
                Message Sent!
              </p>
              <p className="text-white/50 text-sm tracking-wide">
                We&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs tracking-widest uppercase text-white/50 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/15 rounded px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs tracking-widest uppercase text-white/50 mb-1.5">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/15 rounded px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs tracking-widest uppercase text-white/50 mb-1.5">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/15 rounded px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs tracking-widest uppercase text-white/50 mb-1.5">
                  Comment
                </label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-white/5 border border-white/15 rounded px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full py-4 bg-white text-black font-semibold text-sm tracking-widest uppercase hover:bg-orange-400 hover:text-white transition-all duration-200"
              >
                Send us a note
              </button>
            </form>
          )}
        </div>
      </section>

      <NewsletterSection />
      <Footer />
    </div>
  );
}
