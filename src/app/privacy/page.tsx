import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { FadeIn } from "@/components/common/MotionTransitions";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121316] flex flex-col">
      <Navbar animateLogo={false} />

      <main className="flex-1 pt-32 sm:pt-40 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.05} duration={0.5}>
            <div className="mb-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                LEGAL & GOVERNANCE
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#121316] mt-2">
                Privacy Policy
              </h1>
              <p className="text-xs text-neutral-500 mt-2">
                Last Updated: October 2026 • Durozen Technologies
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} duration={0.6}>
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-black/[0.06] shadow-sm space-y-8 text-neutral-700 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-[#121316] mb-3">
                1. Overview & Commitment
              </h2>
              <p>
                Durozen Technologies (&quot;Durozen&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your organizational and personal data. This Privacy Policy details how we collect, process, and safeguard information gathered through our website, communications, and client engagements.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#121316] mb-3">
                2. Information We Collect
              </h2>
              <p>
                We collect information you directly provide to us when submitting inquiries, booking discovery sessions, or applying for careers. This includes names, work email addresses, company names, project descriptions, and submitted portfolio links.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#121316] mb-3">
                3. Enterprise Data & AI Sovereignty
              </h2>
              <p>
                During engineering engagements, client source code, proprietary data repositories, and model training artifacts remain the exclusive property of the client. Durozen enforces strict data boundaries: no client proprietary data is ever used to train generic public foundation models.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#121316] mb-3">
                4. Data Protection & Security
              </h2>
              <p>
                We employ industry-leading technical and organizational security measures, including end-to-end TLS encryption, least-privilege access control, and continuous vulnerability audits to prevent unauthorized access.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#121316] mb-3">
                5. Contact & Privacy Inquiries
              </h2>
              <p>
                If you have questions regarding this policy or wish to exercise data rights, please contact our compliance officer at{" "}
                <a
                  href="mailto:info@durozen.in"
                  className="text-[#24419E] font-semibold underline"
                >
                  info@durozen.in
                </a>{" "}
                or write to <strong>Durozen Technologies Pvt. Ltd.</strong>, Namakkal, Tamil Nadu, India (+91 81223 39694).
              </p>
            </section>
          </div>
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  );
}
