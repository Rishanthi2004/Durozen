import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { servicesData } from "@/data/services";
import { FadeIn, HoverCard } from "@/components/common/MotionTransitions";
import { getCardAccentClass } from "@/utils/cardAccents";

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const resolvedParams = await params;
  const service = servicesData.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121316] flex flex-col">
      <Navbar animateLogo={false} />

      <main className="flex-1 pt-32 sm:pt-40 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Back */}
          <FadeIn>
            <div className="mb-10">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-[#121316] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to All Engineering Practices</span>
              </Link>
            </div>
          </FadeIn>

          {/* Hero Header */}
          <FadeIn delay={0.05}>
            <div className="mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F3EE] border border-black/[0.06] text-neutral-600 mb-6 shadow-sm">
                <span
                  style={{ backgroundColor: service.color }}
                  className="w-2.5 h-2.5 rounded-full"
                />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  {service.badge}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#121316] leading-[1.1]">
                {service.title}
              </h1>

              <p className="mt-5 text-xl sm:text-2xl font-editorial italic text-neutral-700 leading-snug">
                {service.headline}
              </p>

              <p className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal max-w-3xl">
                {service.description}
              </p>
            </div>
          </FadeIn>

          {/* Metrics Highlight Card */}
          <FadeIn delay={0.1}>
            <HoverCard accent={service.color} className="bg-white rounded-3xl p-8 sm:p-10 border border-black/[0.07] shadow-sm mb-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {service.metrics.map((m, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#121316] font-sans">
                    {m.value}
                  </span>
                  <span className="text-xs text-neutral-600 mt-1 font-medium">
                    {m.label}
                  </span>
                </div>
              ))}
            </HoverCard>
          </FadeIn>

          {/* Key Benefits Card */}
          {service.keyBenefits && (
            <div className={`bg-white rounded-3xl p-8 sm:p-10 border border-black/[0.06] shadow-sm mb-14 ${getCardAccentClass(service.color)}`}>
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-600 mb-4">
                KEY BUSINESS BENEFITS
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.keyBenefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-[#FAF9F6] border border-black/[0.04] flex items-start gap-3"
                  >
                    <CheckCircle2
                      style={{ color: service.color }}
                      className="w-5 h-5 shrink-0 mt-0.5"
                    />
                    <span className="text-xs sm:text-sm font-medium text-neutral-800 leading-relaxed">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Narrative Sections */}
          <div className="space-y-14 mb-20">
            {/* 1. Deep Overview */}
            <div className={`bg-white rounded-3xl p-8 sm:p-10 border border-black/[0.06] shadow-sm ${getCardAccentClass(service.color)}`}>
              <h2 className="text-xl sm:text-2xl font-bold text-[#121316] tracking-tight mb-4">
                Strategic Rationale & Architectural Context
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                {service.detailedContent.overview}
              </p>
            </div>

            {/* 2. Engineering Approach */}
            <div className={`bg-white rounded-3xl p-8 sm:p-10 border border-black/[0.06] shadow-sm ${getCardAccentClass(service.color)}`}>
              <h2 className="text-xl sm:text-2xl font-bold text-[#121316] tracking-tight mb-4">
                The Durozen Methodological Approach
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                {service.detailedContent.approach}
              </p>
            </div>

            {/* 3. Architectural Highlights */}
            <div className={`bg-white rounded-3xl p-8 sm:p-10 border border-black/[0.06] shadow-sm ${getCardAccentClass(service.color)}`}>
              <h2 className="text-xl sm:text-2xl font-bold text-[#121316] tracking-tight mb-6">
                Key Architectural Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.detailedContent.architectureHighlights.map(
                  (hl, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#FAF9F6] border border-black/[0.04] flex items-start gap-3"
                    >
                      <CheckCircle2
                        style={{ color: service.color }}
                        className="w-5 h-5 shrink-0 mt-0.5"
                      />
                      <span className="text-xs sm:text-sm font-medium text-neutral-800 leading-relaxed">
                        {hl}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* 4. Proven Outcomes */}
            <div className={`bg-white rounded-3xl p-8 sm:p-10 border border-black/[0.06] shadow-sm ${getCardAccentClass(service.color)}`}>
              <h2 className="text-xl sm:text-2xl font-bold text-[#121316] tracking-tight mb-6">
                Measurable Business Outcomes
              </h2>
              <div className="space-y-3">
                {service.detailedContent.outcomes.map((oc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF9F6] text-xs sm:text-sm text-neutral-700"
                  >
                    <span
                      style={{ backgroundColor: service.color }}
                      className="w-2 h-2 rounded-full shrink-0"
                    />
                    <span>{oc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Supported Tech Stack */}
            <div className="bg-[#FAF9F6] rounded-3xl p-8 border border-black/[0.06]">
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-600 mb-4">
                CORE TECHNOLOGIES & LIBRARIES
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {service.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3.5 py-1.5 rounded-full bg-white text-xs font-semibold text-neutral-800 border border-black/[0.06] shadow-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTA Card */}
          <FadeIn>
            <div className="bg-[#121316] text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">
                  START AN ENGAGEMENT
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                  Ready to build with {service.shortTitle}?
                </h2>
                <p className="text-neutral-300 text-sm mt-1">
                  Schedule a scoping workshop with our solutions engineers.
                </p>
              </div>
              <Link
                href="/contact"
                style={{ backgroundColor: service.color }}
                className="px-7 py-3.5 rounded-full text-white font-semibold text-sm shadow-md hover:opacity-95 transition-opacity shrink-0"
              >
                Get in Touch
              </Link>
            </div>
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  );
}
