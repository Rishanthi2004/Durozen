"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/common/MotionTransitions";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does Durozen engage with existing internal engineering teams?",
      a: "We integrate directly into your workflows—joining your Slack/Teams channels, participating in agile sprint ceremonies, and submitting pull requests against your version-controlled repositories. We can operate as a dedicated cross-functional pod or as specialized staff specialists augmenting key architectural domains.",
    },
    {
      q: "Who retains intellectual property (IP) and source code rights?",
      a: "You do—100%. All source code, architectural documentation, CI/CD pipelines, and trained model weights developed during the engagement belong entirely to your organization from the first commit.",
    },
    {
      q: "What is your typical project kickoff timeline?",
      a: "We can typically assemble an architectural pod and commence technical discovery within 5 to 10 business days following agreement on scope and technical priorities.",
    },
    {
      q: "How do you ensure enterprise security and regulatory compliance?",
      a: "Our engineers build with zero-trust architectures by default. We adhere to SOC2 Type II, HIPAA, and ISO 27001 guidelines, conducting automated static analysis, container vulnerability scanning, and IAM least-privilege reviews across all infrastructure.",
    },
    {
      q: "Can Durozen assist after initial deployment and launch?",
      a: "Yes. We offer continuous DevOps observability, SLA-backed maintenance, cloud cost optimization, and iterative feature development retainers to support long-term product evolution.",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#F4F3EE]/60 border-t border-black/[0.05]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121316] tracking-tight leading-[1.12]">
              Frequently Asked{" "}
              <span className="text-[#DE2F28] px-1">
                Questions.
              </span>
            </h2>
          </div>
        </FadeIn>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <FadeIn
                key={index}
                delay={index * 0.05}
                className={`bg-white rounded-2xl border border-black/[0.06] overflow-hidden durozen-card-default shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition-colors duration-200 ${
                  isOpen ? "border-black/[0.12] bg-[#FAF8F5]" : ""
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 font-semibold text-base sm:text-lg text-[#121316]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-sm text-neutral-600 leading-relaxed border-t border-black/[0.04] pt-4 font-normal max-w-[55ch]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </FadeIn>
            );
          })}
      </div>
      </div>
    </section>
  );
}
