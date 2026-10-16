import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { FadeIn } from "@/components/common/MotionTransitions";

export default function TermsPage() {
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
                Terms of Service
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
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing or utilizing the website and digital services provided by Durozen Technologies, you agree to comply with and be bound by these Terms of Service.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-[#121316] mb-3">
                  2. Engineering Engagements & Master Service Agreements (MSA)
                </h2>
                <p>
                  Professional software development, cloud infrastructure management, and AI architecture services are governed by separate Master Service Agreements (MSA) and Statements of Work (SOW) executed between Durozen Technologies and each respective client entity.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-[#121316] mb-3">
                  3. Intellectual Property Ownership
                </h2>
                <p>
                  Unless explicitly stated otherwise in a formal client agreement, all custom deliverables, source code repositories, architectural designs, and proprietary schemas produced specifically for a client become the exclusive intellectual property of that client upon receipt of contractually agreed payments.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-[#121316] mb-3">
                  4. Permitted Use & Conduct
                </h2>
                <p>
                  Visitors agree not to probe, scan, or test the vulnerability of our digital infrastructure or attempt to circumvent security headers, firewalls, or API access rate limiters.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-[#121316] mb-3">
                  5. Governing Law & Jurisdiction
                </h2>
                <p>
                  These terms are governed by and construed in accordance with the laws of India. For any legal inquiries regarding our terms, please contact{" "}
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
