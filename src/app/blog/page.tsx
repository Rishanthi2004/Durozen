"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, HoverCard } from "@/components/common/MotionTransitions";
import KnowledgeAiAnimation from "@/components/animations/KnowledgeAiAnimation";

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  date: string;
  accentColor: string;
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Autonomous AI",
    "Cloud Architecture",
    "Distributed Systems",
    "Security & Governance",
  ];

  const blogPosts: BlogPost[] = [
    {
      id: "how-to-automate-repetitive-business-processes",
      title: "How to Automate Repetitive Business Processes: A Practical Guide",
      summary:
        "A practical, step-by-step engineering roadmap for identifying operational bottlenecks, orchestrating workflow automations, and deploying autonomous AI agents to reclaim hundreds of team hours.",
      category: "Workflow Automation",
      readTime: "8 min read",
      date: "October 2026",
      accentColor: "#DE2F28",
    },
    {
      id: "agentic-rag-architectures",
      title: "Designing Fault-Tolerant Multi-Agent RAG Architectures at Enterprise Scale",
      summary:
        "How we orchestrate autonomous LLM reasoning agents with deterministic validation gates to eliminate hallucinations in high-throughput enterprise document processing.",
      category: "Autonomous AI",
      readTime: "7 min read",
      date: "October 2026",
      accentColor: "#24419E",
    },
    {
      id: "zero-downtime-k8s-mesh",
      title: "Zero-Downtime Microservices: Implementing Multi-Cloud Service Meshes with Istio",
      summary:
        "A deep dive into routing topologies, active-active cross-region failover, and automated canary deployments for sub-50ms international P99 latencies.",
      category: "Cloud Architecture",
      readTime: "9 min read",
      date: "September 2026",
      accentColor: "#549B31",
    },
    {
      id: "event-driven-eda-scaling",
      title: "High-Throughput Event Sourcing with Kafka and Go: Lessons from 100M+ Daily Events",
      summary:
        "Key design patterns for stateful event-driven pipelines, compaction strategies, and backpressure handling when scaling mission-critical transaction processors.",
      category: "Distributed Systems",
      readTime: "6 min read",
      date: "August 2026",
      accentColor: "#24419E",
    },
    {
      id: "zero-trust-llm-gateways",
      title: "Hardening Enterprise AI: Building Zero-Trust Private LLM Inference Gateways",
      summary:
        "Ensuring data sovereignty, role-based cryptographic isolation, and continuous SOC 2 compliance when deploying proprietary generative models on private VPC clusters.",
      category: "Security & Governance",
      readTime: "8 min read",
      date: "July 2026",
      accentColor: "#F4A81E",
    },
    {
      id: "nextjs-edge-caching",
      title: "Sub-Second Global Render Times: Advanced Next.js Server Components and Edge Caching",
      summary:
        "Optimizing Core Web Vitals and dynamic server rendering across edge locations while preserving real-time personalized data streams.",
      category: "Cloud Architecture",
      readTime: "5 min read",
      date: "June 2026",
      accentColor: "#DE2F28",
    },
    {
      id: "distributed-database-patterns",
      title: "Distributed Data Consistency: Navigating Raft Consensus and Multi-Region Read Replicas",
      summary:
        "Real-world trade-offs between consistency and availability in globally distributed transactional databases, with benchmarking under adverse network partitioning.",
      category: "Distributed Systems",
      readTime: "11 min read",
      date: "May 2026",
      accentColor: "#24419E",
    },
  ];

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121316] flex flex-col">
      <Navbar animateLogo={false} />

      <main className="flex-1 pt-32 sm:pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Right-Side Knowledge & AI Animation */}
          <div className="relative mb-12 sm:mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <FadeIn>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F3EE] border border-black/[0.06] text-neutral-600 mb-6 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#24419E]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                      ENGINEERING PERSPECTIVES
                    </span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#121316] leading-[1.1]">
                    Insights on AI, Cloud &{" "}
                    <span className="font-editorial font-normal italic text-[1.14em] px-1">
                      Distributed
                    </span>{" "}
                    Systems.
                  </h1>

                  <p className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
                    Technical articles, architectural breakdowns, and field notes from Durozen&apos;s engineering principals on building mission-critical software.
                  </p>
                </FadeIn>
              </div>

              {/* Right-Side Knowledge & AI Animation */}
              <div className="flex lg:col-span-5 items-center justify-center relative mt-8 lg:mt-0">
                <FadeIn delay={0.2}>
                  <KnowledgeAiAnimation />
                </FadeIn>
              </div>
            </div>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-12 pb-6 border-b border-black/[0.06]">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 ${
                    isSelected
                      ? "bg-[#121316] text-white shadow-sm"
                      : "bg-white text-neutral-600 border border-black/[0.06] hover:bg-neutral-100 hover:text-[#121316]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Blog Posts Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                >
                  <HoverCard
                    accent={post.accentColor}
                    className="h-full bg-white rounded-3xl p-8 border border-black/[0.07] shadow-sm hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] flex flex-col justify-between relative overflow-hidden group"
                  >
                    <div
                      style={{ backgroundColor: post.accentColor }}
                      className="absolute top-0 left-0 right-0 h-1.5"
                    />

                    <div>
                      <div className="flex items-center justify-between text-xs text-neutral-500 mb-4 pt-1">
                        <span
                          style={{ color: post.accentColor }}
                          className="font-bold uppercase tracking-wider text-[10px]"
                        >
                          {post.category}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <h2 className="text-xl font-bold text-[#121316] tracking-tight mb-3 group-hover:text-[#DE2F28] transition-colors leading-snug">
                        {post.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal mb-6">
                        {post.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-black/[0.05] flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.date}</span>
                      </div>

                      <Link
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#121316] group-hover:text-[#DE2F28] transition-colors"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </HoverCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Bottom Consultation CTA */}
          <FadeIn>
            <div className="bg-[#121316] text-white rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Have an Engineering Challenge to Solve?
              </h2>
              <p className="mt-3 text-neutral-300 text-sm sm:text-base max-w-xl mx-auto font-normal">
                Schedule a technical consultation with our engineering leaders to discuss system architecture, scalability, or AI adoption.
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-full bg-[#DE2F28] text-white font-bold text-sm tracking-tight shadow-md hover:bg-[#c9241e] transition-colors"
                >
                  Book a Consultation
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  );
}
