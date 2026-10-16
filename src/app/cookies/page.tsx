"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { ArrowLeft, Cookie } from "lucide-react";
import { FadeIn } from "@/components/common/MotionTransitions";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121316] flex flex-col">
      <Navbar animateLogo={false} />

      <main className="flex-1 pt-32 sm:pt-40 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <FadeIn direction="down" duration={0.4} className="mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-[#121316] transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span>Back to Home</span>
            </Link>
          </FadeIn>

          <FadeIn delay={0.05} duration={0.5}>
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F3EE] border border-black/[0.06] text-neutral-600 mb-6 shadow-sm">
                <Cookie className="w-3.5 h-3.5 text-[#F4A81E]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  LEGAL & COMPLIANCE
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#121316]">
                Cookie Policy
              </h1>
              <p className="mt-3 text-sm text-neutral-500">
                Last updated: October 2026 • Durozen Technologies Pvt. Ltd.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} duration={0.6}>
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-black/[0.07] shadow-sm space-y-8 text-neutral-700 leading-relaxed text-sm sm:text-base">
              <section>
                <h2 className="text-xl font-bold text-[#121316] mb-3">
                  1. What Are Cookies?
                </h2>
                <p>
                  Cookies are small text files that are stored on your device when you visit a website. At Durozen Technologies Pvt. Ltd., we use essential cookies and minimal analytical telemetry to ensure our web applications operate reliably, maintain session state, and deliver optimal rendering performance.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#121316] mb-3">
                  2. How We Use Cookies
                </h2>
                <p>
                  We do not use intrusive cross-site tracking or commercial advertising cookies. Our cookie usage is strictly categorized as follows:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs sm:text-sm">
                  <li><strong>Strictly Necessary Cookies:</strong> Essential for page routing, navigation security, and CSRF protection.</li>
                  <li><strong>Preference Cookies:</strong> Remember your selected display preferences and accessibility settings.</li>
                  <li><strong>Performance Telemetry:</strong> Aggregated, anonymized performance metrics (e.g. Core Web Vitals) to optimize page load speeds.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#121316] mb-3">
                  3. Managing Cookie Preferences
                </h2>
                <p>
                  You can manage or disable cookies at any time through your browser settings. Please note that disabling essential cookies may impact the rendering performance and functionality of certain interactive features.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#121316] mb-3">
                  4. Contact Information
                </h2>
                <p>
                  For questions regarding our Cookie Policy, please contact us at:
                </p>
                <div className="mt-3 p-4 rounded-xl bg-[#FAF9F6] border border-black/[0.05] text-xs sm:text-sm">
                  <p><strong>Durozen Technologies Pvt. Ltd.</strong></p>
                  <p>Location: Namakkal, Tamil Nadu, India</p>
                  <p>Email: <a href="mailto:info@durozen.in" className="text-[#DE2F28] hover:underline">info@durozen.in</a></p>
                  <p>Phone: <a href="tel:+918122339694" className="text-[#24419E] hover:underline">+91 81223 39694</a></p>
                </div>
              </section>
            </div>
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  );
}
