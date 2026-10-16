"use client";

import React, { useState } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import {
  Send,
  CheckCircle2,
  Code2,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from "@/components/common/MotionTransitions";
import InnovationCollaborationAnimation from "@/components/animations/InnovationCollaborationAnimation";

export default function CareersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    discipline: "Full-Stack Software Engineering",
    portfolioUrl: "",
    message: "",
  });

  const handleEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const disciplines = [
    "Full-Stack Software Engineering",
    "Cloud & DevOps Architecture",
    "AI & Machine Learning Solutions",
    "Mobile Application Development",
    "UI/UX & Product Design",
    "Quality Assurance & Test Automation",
  ];

  const values = [
    {
      title: "High-Craft Engineering",
      description:
        "We prioritize code craftsmanship, clean architecture, and type-safety over hasty shortcuts.",
      icon: <Code2 className="w-5 h-5 text-white" />,
      color: "#DE2F28",
      tag: "DISCIPLINE",
    },
    {
      title: "Deep Technical Autonomy",
      description:
        "Engineers own architecture decisions, participate in design reviews, and iterate with high trust.",
      icon: <Zap className="w-5 h-5 text-white" />,
      color: "#F4A81E",
      tag: "AUTONOMY",
    },
    {
      title: "Modern Tech Standards",
      description:
        "Work with contemporary frameworks: Next.js, Go, Python, Kubernetes, Kafka, and autonomous AI agents.",
      icon: <Sparkles className="w-5 h-5 text-white" />,
      color: "#549B31",
      tag: "INNOVATION",
    },
    {
      title: "Transparent & Respectful",
      description:
        "Open communication, constructive peer reviews, and collaborative problem-solving across all levels.",
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
      color: "#24419E",
      tag: "CULTURE",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121316] flex flex-col">
      <Navbar animateLogo={false} />

      <main className="flex-1 pt-32 sm:pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Right-Side Innovation & Collaboration Animation */}
          <div className="relative mb-16 sm:mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <FadeIn>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F3EE] border border-black/[0.06] text-neutral-600 mb-6 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#F4A81E]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                      CAREERS & TALENT
                    </span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#121316] leading-[1.1]">
                    Engineering With{" "}
                    <span className="font-editorial font-normal italic text-[1.14em] px-1">
                      Curiosity
                    </span>{" "}
                    & Craft.
                  </h1>

                  <p className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
                    At Durozen Technologies Pvt. Ltd., we are always interested in connecting with talented software engineers, cloud architects, and designers who care deeply about building high-craft, dependable digital products.
                  </p>
                </FadeIn>
              </div>

              {/* Right-Side Innovation & Collaboration Animation */}
              <div className="flex lg:col-span-5 items-center justify-center relative mt-8 lg:mt-0">
                <FadeIn delay={0.2}>
                  <InnovationCollaborationAnimation />
                </FadeIn>
              </div>
            </div>
          </div>

          {/* Culture / Values Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {values.map((val) => (
              <StaggerItem key={val.title}>
                <HoverCard
                  accent={val.color}
                  className="h-full bg-white rounded-3xl p-7 border border-black/[0.06] shadow-sm hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] flex flex-col justify-between"
                >
                  <div>
                    <div
                      style={{ backgroundColor: val.color }}
                      className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm mb-6"
                    >
                      {val.icon}
                    </div>
                    <span
                      style={{ color: val.color }}
                      className="text-[10px] font-bold uppercase tracking-wider block mb-1"
                    >
                      {val.tag}
                    </span>
                    <h3 className="font-bold text-lg text-[#121316] tracking-tight mb-2">
                      {val.title}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                      {val.description}
                    </p>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Professional Career Enquiry Section */}
          <FadeIn>
            <div className="bg-white rounded-3xl p-8 sm:p-14 border border-black/[0.07] shadow-sm relative overflow-hidden mb-20">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#DE2F28]" />

              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#DE2F28]">
                  GENERAL CAREER ENQUIRY
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121316] tracking-tight mt-1">
                  Introduce Yourself to Durozen
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                  While we review applications based on active client requirements and project engagements, our leadership team welcomes profiles from dedicated engineers, developers, and problem solvers.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#549B31]/15 text-[#549B31] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#121316]">
                    Thank You, {formData.name}!
                  </h3>
                  <p className="text-sm text-neutral-600 mt-2 max-w-md mx-auto">
                    Your details have been received by our engineering leadership team. We will reach out when an alignment matches your background and expertise.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        discipline: "Full-Stack Software Engineering",
                        portfolioUrl: "",
                        message: "",
                      });
                    }}
                    className="mt-6 px-6 py-2.5 rounded-full bg-[#121316] text-white text-xs font-semibold hover:bg-neutral-800 transition-colors"
                  >
                    Submit Another Profile
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquiry} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Rohan Kumar"
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-black/10 text-sm focus:outline-none focus:border-[#24419E] focus:bg-white text-[#121316]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="rohan@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-black/10 text-sm focus:outline-none focus:border-[#24419E] focus:bg-white text-[#121316]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-black/10 text-sm focus:outline-none focus:border-[#24419E] focus:bg-white text-[#121316]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                        LinkedIn / GitHub / Portfolio Link
                      </label>
                      <input
                        type="url"
                        value={formData.portfolioUrl}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            portfolioUrl: e.target.value,
                          })
                        }
                        placeholder="https://github.com/yourhandle"
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-black/10 text-sm focus:outline-none focus:border-[#24419E] focus:bg-white text-[#121316]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                      Primary Engineering Discipline *
                    </label>
                    <select
                      value={formData.discipline}
                      onChange={(e) =>
                        setFormData({ ...formData, discipline: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-black/10 text-sm focus:outline-none focus:border-[#24419E] focus:bg-white text-[#121316]"
                    >
                      {disciplines.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                      Brief Introduction / Note *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Share a brief overview of your background, systems you have built, and areas of engineering you are passionate about..."
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-black/10 text-sm focus:outline-none focus:border-[#24419E] focus:bg-white text-[#121316]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#DE2F28] text-white font-bold text-sm tracking-tight shadow-md hover:bg-[#c9241e] transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Career Enquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  );
}
