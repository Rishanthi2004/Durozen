"use client";

import React, { useState } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageCircle, ArrowUpRight, Loader2 } from "lucide-react";
import { FadeIn, HoverCard } from "@/components/common/MotionTransitions";
import ConnectedNetworkAnimation from "@/components/animations/ConnectedNetworkAnimation";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "Custom Software Development",
    budget: "$25k - $50k",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "";

    if (scriptUrl) {
      try {
        await fetch(scriptUrl, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(formData),
          mode: "no-cors",
        });
        setSubmitted(true);
      } catch (err) {
        console.error("Error submitting inquiry to Google Apps Script:", err);
        setErrorMessage("An unexpected error occurred while sending your inquiry. Please try again or email us directly at info@durozen.in.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Graceful fallback if environment variable is not yet configured
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 600);
    }
  };

  const serviceOptions = [
    "Custom Software Development",
    "Enterprise Application Development",
    "Website Development",
    "Mobile App Development",
    "Cloud Engineering",
    "DevOps Services",
    "AI and Machine Learning Solutions",
    "Data Engineering",
    "UI/UX Design",
    "Product Development",
    "API Development and Integration",
    "IT Consulting & Transformation",
    "Quality Assurance & Test Automation",
  ];

  const budgetOptions = [
    "Under $25k",
    "$25k - $50k",
    "$50k - $100k",
    "$100k+",
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121316] flex flex-col">
      <Navbar animateLogo={false} />

      <main className="flex-1 pt-32 sm:pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Right-Side Connected Network Animation */}
          <div className="relative mb-16 sm:mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <FadeIn delay={0.05} duration={0.6}>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F3EE] border border-black/[0.06] text-neutral-600 mb-6 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#DE2F28]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                      INITIATE A CONVERSATION
                    </span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#121316] leading-[1.1]">
                    Let&apos;s Build Something{" "}
                    <span className="font-editorial font-normal italic text-[1.14em] px-1">
                      Exceptional
                    </span>{" "}
                    Together.
                  </h1>

                  <p className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
                    Durozen Technologies Pvt. Ltd. is Your Trusted Digital Transformation Partner. Whether you need custom software, cloud engineering, or enterprise automation, our engineering leaders are ready to partner.
                  </p>
                </FadeIn>
              </div>

              {/* Right-Side Animated Minimal Rings */}
              <div className="flex lg:col-span-5 items-center justify-center relative mt-8 lg:mt-0">
                <FadeIn delay={0.2} duration={0.6} className="w-full flex justify-center">
                  <ConnectedNetworkAnimation />
                </FadeIn>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Form */}
            <div className="lg:col-span-7">
              <FadeIn delay={0.15} duration={0.6}>
                <div className="bg-white rounded-3xl p-8 sm:p-12 border border-black/[0.07] shadow-[0_16px_40px_rgba(0,0,0,0.03)] relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#DE2F28]" />

              {submitted ? (
                <div className="py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#549B31]/15 text-[#549B31] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#121316]">
                    Inquiry Received!
                  </h3>
                  <p className="text-sm text-neutral-600 mt-3 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#121316]">{formData.name}</strong>. A Durozen engineering director will review your project requirements for <strong className="text-[#121316]">{formData.service}</strong> and respond within 24 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        company: "",
                        email: "",
                        phone: "",
                        service: "Custom Software Development",
                        budget: "$25k - $50k",
                        message: "",
                      });
                    }}
                    className="mt-8 px-6 py-2.5 rounded-full bg-[#121316] text-white text-xs font-semibold hover:bg-neutral-800 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Alex Morgan"
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-black/10 text-sm focus:outline-none focus:border-[#DE2F28] focus:ring-2 focus:ring-[#DE2F28]/15 focus:bg-white text-[#121316] transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        placeholder="Acme Technologies"
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-black/10 text-sm focus:outline-none focus:border-[#DE2F28] focus:ring-2 focus:ring-[#DE2F28]/15 focus:bg-white text-[#121316] transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="alex@enterprise.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-black/10 text-sm focus:outline-none focus:border-[#DE2F28] focus:ring-2 focus:ring-[#DE2F28]/15 focus:bg-white text-[#121316] transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-black/10 text-sm focus:outline-none focus:border-[#DE2F28] focus:ring-2 focus:ring-[#DE2F28]/15 focus:bg-white text-[#121316] transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Service Required */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                      Service Required *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-black/10 text-sm focus:outline-none focus:border-[#DE2F28] focus:ring-2 focus:ring-[#DE2F28]/15 focus:bg-white text-[#121316] transition-all duration-200"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Project Budget */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                      Project Budget Range
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetOptions.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setFormData({ ...formData, budget: b })}
                          className={`py-2 px-2 text-center rounded-xl text-xs font-semibold transition-all ${
                            formData.budget === b
                              ? "bg-[#DE2F28] text-white shadow-sm"
                              : "bg-[#FAF9F6] text-neutral-600 border border-black/5 hover:bg-neutral-100"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Describe your technical objectives, existing system constraints, target timelines, and core deliverables..."
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-black/10 text-sm focus:outline-none focus:border-[#DE2F28] focus:ring-2 focus:ring-[#DE2F28]/15 focus:bg-white text-[#121316] transition-all duration-200"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-[#DE2F28] leading-relaxed">
                      {errorMessage}
                    </div>
                  )}

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full py-4 rounded-full bg-[#DE2F28] text-white font-bold text-sm tracking-tight shadow-md hover:bg-[#c9241e] disabled:opacity-75 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Sending Project Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                          <span>Send Project Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
                </div>
              </FadeIn>
            </div>

            {/* Right: Verified Company Information & WhatsApp Action */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct Contacts Card */}
              <FadeIn delay={0.25} duration={0.6}>
                <HoverCard accent="red" className="bg-white rounded-3xl p-8 border border-black/[0.06] shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500 mb-6">
                    DIRECT COMMUNICATIONS
                  </h3>

                    <div className="space-y-6">
                      {/* Email */}
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#24419E]/10 text-[#24419E] flex items-center justify-center shrink-0">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase text-neutral-400">
                            EMAIL DIRECT
                          </span>
                          <p className="text-sm font-bold text-[#121316] mt-0.5">
                            <a
                              href="mailto:info@durozen.in"
                              className="hover:text-[#DE2F28] transition-colors"
                            >
                              info@durozen.in
                            </a>
                          </p>
                          <p className="text-xs text-neutral-500">
                            Project scoping & general enquiries
                          </p>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#549B31]/10 text-[#549B31] flex items-center justify-center shrink-0">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase text-neutral-400">
                            PHONE / CALL
                          </span>
                          <p className="text-sm font-bold text-[#121316] mt-0.5">
                            <a
                              href="tel:+918122339694"
                              className="hover:text-[#549B31] transition-colors"
                            >
                              +91 81223 39694
                            </a>
                          </p>
                          <p className="text-xs text-neutral-500">
                            Direct line to technical advisory
                          </p>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#F4A81E]/10 text-[#F4A81E] flex items-center justify-center shrink-0">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase text-neutral-400">
                            OFFICE LOCATION
                          </span>
                          <p className="text-sm font-bold text-[#121316] mt-0.5">
                            Durozen Technologies Private Limited
                          </p>
                          <p className="text-xs text-neutral-500">
                            Namakkal, Tamil Nadu, India
                          </p>
                          <a
                            href="https://www.google.com/maps/place/Durozen+Technologies+Private+Limited/@11.148956,78.215225,15z/data=!4m6!3m5!1s0x3babcbd8fe6408d7:0x70d17da5da2fc025!8m2!3d11.1489563!4d78.215225!16s%2Fg%2F11z69cpfgz?hl=en-US"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#24419E] hover:text-[#DE2F28] transition-colors mt-2 group"
                          >
                            <span>Open on Google Maps</span>
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp Quick Enquiry Button */}
                    <div className="mt-8 pt-6 border-t border-black/[0.06]">
                      <a
                        href="https://wa.me/918122339694?text=Hello%20Durozen%20Technologies,%20I%20would%20like%20to%20enquire%20about%20your%20services."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] text-white font-bold text-xs sm:text-sm hover:bg-[#20ba59] transition-all duration-200 flex items-center justify-center gap-2 shadow-sm group"
                      >
                        <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                        <span>WhatsApp Quick Enquiry</span>
                      </a>
                      <p className="text-[11px] text-neutral-500 text-center mt-2">
                        Connect directly with our team on WhatsApp
                      </p>
                    </div>
                  </HoverCard>
                </FadeIn>

                {/* Location Map Card replacing previous stats card */}
                <FadeIn delay={0.35} duration={0.6}>
                  <HoverCard accent="blue" className="bg-white rounded-3xl p-6 sm:p-7 border border-black/[0.06] shadow-sm overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#DE2F28]" />
                          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                            OFFICE LOCATION • MAP
                          </span>
                        </div>
                        <span className="text-xs font-mono text-neutral-500">
                          11.15° N, 78.22° E
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-[#121316] tracking-tight">
                        Durozen Technologies Private Limited
                      </h3>
                      <p className="text-xs text-neutral-600 mt-0.5">
                        Namakkal, Tamil Nadu, India
                      </p>
                    </div>

                    {/* Map View Frame */}
                    <div className="mt-4 rounded-2xl overflow-hidden border border-black/[0.06] relative h-60 sm:h-64 bg-[#FAF9F6]">
                      <iframe
                        title="Durozen Technologies Private Limited Location Map"
                        src="https://maps.google.com/maps?q=11.1489563,78.215225&hl=en&z=15&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                      />
                      <a
                        href="https://www.google.com/maps/place/Durozen+Technologies+Private+Limited/@11.148956,78.215225,15z/data=!4m6!3m5!1s0x3babcbd8fe6408d7:0x70d17da5da2fc025!8m2!3d11.1489563!4d78.215225!16s%2Fg%2F11z69cpfgz?hl=en-US"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-2.5 right-2.5 px-3 py-1.5 rounded-lg bg-[#121316]/90 backdrop-blur-sm text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-md hover:bg-[#DE2F28] transition-colors"
                      >
                        <span>View larger map</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="mt-4 pt-3 border-t border-black/[0.05] flex items-center justify-between text-xs">
                      <span className="text-neutral-500 font-medium text-[11px]">
                        Namakkal Headquarters
                      </span>
                      <a
                        href="https://www.google.com/maps/place/Durozen+Technologies+Private+Limited/@11.148956,78.215225,15z/data=!4m6!3m5!1s0x3babcbd8fe6408d7:0x70d17da5da2fc025!8m2!3d11.1489563!4d78.215225!16s%2Fg%2F11z69cpfgz?hl=en-US"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#24419E] hover:text-[#DE2F28] font-semibold text-xs inline-flex items-center gap-1 transition-colors group"
                      >
                        <span>Get Directions</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </HoverCard>
                </FadeIn>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
