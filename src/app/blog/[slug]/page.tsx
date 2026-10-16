import React from "react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { ArrowLeft, Clock, Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import { FadeIn, HoverCard } from "@/components/common/MotionTransitions";

export function generateStaticParams() {
  return [
    { slug: "how-to-automate-repetitive-business-processes" },
    { slug: "agentic-rag-architectures" },
    { slug: "zero-downtime-k8s-mesh" },
    { slug: "event-driven-eda-scaling" },
    { slug: "zero-trust-llm-gateways" },
    { slug: "nextjs-edge-caching" },
    { slug: "distributed-database-patterns" },
  ];
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const isPracticalGuide =
    resolvedParams.slug === "how-to-automate-repetitive-business-processes";

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121316] flex flex-col">
      <Navbar animateLogo={false} />

      <main className="flex-1 pt-32 sm:pt-40 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Breadcrumb */}
          <FadeIn direction="down" duration={0.4} className="mb-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-[#121316] transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span>Back to All Articles & Perspectives</span>
            </Link>
          </FadeIn>

          {/* Article Header */}
          <FadeIn delay={0.1} duration={0.6}>
            <header className="mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F3EE] border border-black/[0.06] text-neutral-600 mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#DE2F28]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  PRACTICAL ENGINEERING GUIDE
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#121316] leading-[1.15]">
                {isPracticalGuide
                  ? "How to Automate Repetitive Business Processes: A Practical Guide"
                  : "Architectural Deep-Dive: Enterprise Engineering Perspectives"}
              </h1>

              <p className="mt-5 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
                A comprehensive technical blueprint for engineering teams seeking to eliminate operational bottlenecks, integrate deterministic AI workflows, and scale throughput safely.
              </p>

              <div className="mt-8 pt-6 border-t border-black/[0.06] flex flex-wrap items-center gap-6 text-xs text-neutral-500 font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#DE2F28] text-white flex items-center justify-center font-bold text-[11px]">
                    D
                  </span>
                  <span className="font-semibold text-[#121316]">
                    Durozen Engineering Team
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>October 2026</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>8 min read</span>
                </div>
              </div>
            </header>
          </FadeIn>

          {/* Key Takeaways Card */}
          <FadeIn delay={0.2} duration={0.6}>
            <div className="bg-[#FAF9F6] rounded-3xl p-6 sm:p-8 border border-black/[0.06] mb-12 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-700 mb-3">
                KEY TAKEAWAYS FOR TECHNICAL LEADERSHIP
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#549B31] shrink-0 mt-0.5" />
                  <span>Focus automation on processes with high repetition, clear input formats, and measurable error costs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#549B31] shrink-0 mt-0.5" />
                  <span>Decouple input ingestion from core business rules using asynchronous event queues (Kafka, Redis).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#549B31] shrink-0 mt-0.5" />
                  <span>Incorporate human-in-the-loop review gates whenever automated confidence falls below predefined thresholds.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#549B31] shrink-0 mt-0.5" />
                  <span>Maintain deterministic database transaction logs so every automated execution is 100% auditable.</span>
                </li>
              </ul>
            </div>
          </FadeIn>

          {/* Article Body Content */}
          <article className="prose prose-neutral max-w-none space-y-8 text-neutral-700 leading-relaxed text-sm sm:text-base">
            <FadeIn delay={0.15}>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121316] tracking-tight mb-4">
                  1. Identifying High-Cost Repetitive Bottlenecks
                </h2>
                <p>
                  In most growing organizations, skilled operational talent spends hours manually re-keying data between disparate systems: transcribing supplier invoices into ERP ledgers, updating CRM status tags following payments, and emailing routine compliance reminders.
                </p>
                <p className="mt-3">
                  Before writing any automation scripts, audit your company&apos;s daily operations against three qualification criteria:
                </p>
                <div className="my-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <HoverCard accent="red" className="h-full p-4 bg-white rounded-2xl border border-black/[0.06] shadow-sm">
                    <span className="text-[10px] font-bold text-[#DE2F28] uppercase">Criterion 01</span>
                    <h4 className="font-bold text-xs sm:text-sm text-[#121316] mt-1">High Transaction Frequency</h4>
                    <p className="text-xs text-neutral-600 mt-1">The task occurs dozens or hundreds of times per week with consistent rules.</p>
                  </HoverCard>
                  <HoverCard accent="orange" className="h-full p-4 bg-white rounded-2xl border border-black/[0.06] shadow-sm">
                    <span className="text-[10px] font-bold text-[#F4A81E] uppercase">Criterion 02</span>
                    <h4 className="font-bold text-xs sm:text-sm text-[#121316] mt-1">Structured or Semi-Structured Data</h4>
                    <p className="text-xs text-neutral-600 mt-1">Inputs follow predictable patterns (PDFs, CSVs, emails, or API payloads).</p>
                  </HoverCard>
                  <HoverCard accent="green" className="h-full p-4 bg-white rounded-2xl border border-black/[0.06] shadow-sm">
                    <span className="text-[10px] font-bold text-[#549B31] uppercase">Criterion 03</span>
                    <h4 className="font-bold text-xs sm:text-sm text-[#121316] mt-1">Measurable Lag Overhead</h4>
                    <p className="text-xs text-neutral-600 mt-1">Delays directly hinder customer experience, settlement, or team velocity.</p>
                  </HoverCard>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121316] tracking-tight mb-4">
                  2. Mapping Data Streams and API Interfaces
                </h2>
                <p>
                  Brittle automations fail when third-party tools change without warning. The hallmark of resilient engineering is establishing strict contract boundaries. Rather than having services trigger each other synchronously in an unmaintainable web, implement an asynchronous event pipeline.
                </p>
                <p className="mt-3">
                  When a web inquiry arrives or an invoice is dropped into cloud storage, emit an immutable event payload to a durable message broker like Apache Kafka or Redis Streams. This ensures that even if downstream CRM or ERP endpoints encounter temporary maintenance, zero messages are dropped.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121316] tracking-tight mb-4">
                  3. Deploying Deterministic AI Reasoning Agents
                </h2>
                <p>
                  Traditional Robotic Process Automation (RPA) breaks the instant a vendor shifts an invoice header or formats a phone number differently. Modern multi-agent AI systems overcome this through generalized semantic understanding.
                </p>
                <p className="mt-3">
                  At Durozen, our engineering approach combines specialized OCR with LLM extraction and JSON schema enforcement:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mt-2">
                  <li><strong>Ingestion:</strong> High-resolution document normalization and text extraction.</li>
                  <li><strong>Reasoning:</strong> LLM agents parse field line items, taxes, currency codes, and vendor entities.</li>
                  <li><strong>Validation:</strong> Mathematical sanity checks verify totals match before pushing to production databases.</li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121316] tracking-tight mb-4">
                  4. Incorporating Human-in-the-Loop Safeguards
                </h2>
                <p>
                  Complete autonomy is rarely appropriate on day one. Enterprise trust is earned by instituting deterministic confidence scores. If an AI agent parses an ambiguous contract with 98% confidence, it processes the record autonomously. If confidence dips below 90%, it flags the item for one-click human review.
                </p>
                <p className="mt-3">
                  This balances exponential throughput gains with 100% operational safety, providing operations teams with complete oversight.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121316] tracking-tight mb-4">
                  5. Continuous Observability & SLA Monitoring
                </h2>
                <p>
                  Every automated execution must leave an immutable telemetry trail. By monitoring execution duration, error retry rates, and failure modes through OpenTelemetry and Grafana, technical leads can detect API deprecations and process deviations before end customers are impacted.
                </p>
              </div>
            </FadeIn>
          </article>

          {/* Bottom Consultation CTA */}
          <FadeIn delay={0.25} duration={0.6}>
            <div className="mt-16 bg-[#121316] text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#DE2F28]">
                  NEED ASSISTANCE AUTOMATING YOUR OPERATIONS?
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                  Consult with Durozen Systems Architects
                </h3>
                <p className="text-neutral-300 text-xs sm:text-sm mt-1">
                  We review your operational workflows and design custom automation blueprints.
                </p>
              </div>
              <Link
                href="/contact"
                className="group px-7 py-3.5 rounded-full bg-[#DE2F28] text-white font-bold text-xs sm:text-sm hover:bg-[#c9241e] transition-colors shrink-0 flex items-center gap-2"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  );
}
