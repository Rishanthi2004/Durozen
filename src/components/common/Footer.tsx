"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Mail, Phone, MapPin } from "lucide-react";
import DurozenLogo from "./Logo";
import { FadeIn } from "./MotionTransitions";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#F4F3EE] border-t border-black/[0.06] pt-16 lg:pt-20 pb-8 text-[#121316] relative overflow-hidden">
      {/* Top 4-Color Subtle Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        <div className="flex-1 bg-[#DE2F28]" />
        <div className="flex-1 bg-[#F4A81E]" />
        <div className="flex-1 bg-[#549B31]" />
        <div className="flex-1 bg-[#24419E]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 pb-14 border-b border-black/[0.07]">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-2 lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-4">
                <DurozenLogo size="lg" animated={false} showSubtitle={false} />
              </Link>
              <p className="text-sm text-neutral-600 max-w-sm mt-3 leading-relaxed">
                <strong>Durozen Technologies Pvt. Ltd.</strong> — Your Trusted Digital Transformation Partner. Engineering custom software, resilient cloud architectures, and autonomous AI systems.
              </p>

              <div className="mt-5 space-y-1.5 text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#DE2F28] shrink-0" />
                  <a
                    href="https://www.google.com/maps/place/Durozen+Technologies+Private+Limited/@11.148956,78.215225,15z/data=!4m6!3m5!1s0x3babcbd8fe6408d7:0x70d17da5da2fc025!8m2!3d11.1489563!4d78.215225!16s%2Fg%2F11z69cpfgz?hl=en-US"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-[#DE2F28] transition-colors"
                  >
                    Namakkal, Tamil Nadu, India
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#24419E] shrink-0" />
                  <a href="mailto:info@durozen.in" className="hover:underline">
                    info@durozen.in
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#549B31] shrink-0" />
                  <a href="tel:+918122339694" className="hover:underline">
                    +91 81223 39694
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#549B31] animate-pulse" />
              <span className="text-xs font-semibold text-neutral-600">
                All Systems Operational • Enterprise SLAs Active
              </span>
            </div>
          </div>

          {/* Quick Links Column (Services) - Side by Side on Mobile */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500 mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/services/custom-software"
                  className="text-neutral-700 hover:text-[#DE2F28] transition-colors"
                >
                  Custom Software
                </Link>
              </li>
              <li>
                <Link
                  href="/services/cloud-engineering"
                  className="text-neutral-700 hover:text-[#549B31] transition-colors"
                >
                  Cloud Engineering
                </Link>
              </li>
              <li>
                <Link
                  href="/services/ai-solutions"
                  className="text-neutral-700 hover:text-[#24419E] transition-colors"
                >
                  AI & ML Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/services/mobile-app-development"
                  className="text-neutral-700 hover:text-[#F4A81E] transition-colors"
                >
                  Mobile Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-xs font-bold text-[#DE2F28] hover:underline"
                >
                  View All 13 Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column - Side by Side on Mobile */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-neutral-700 hover:text-[#121316] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions"
                  className="text-neutral-700 hover:text-[#121316] transition-colors"
                >
                  Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-neutral-700 hover:text-[#121316] transition-colors"
                >
                  Client Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-neutral-700 hover:text-[#121316] transition-colors"
                >
                  Our Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/process"
                  className="text-neutral-700 hover:text-[#121316] transition-colors"
                >
                  Development Process
                </Link>
              </li>
              <li>
                <Link
                  href="/why-choose-us"
                  className="text-neutral-700 hover:text-[#121316] transition-colors"
                >
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-neutral-700 hover:text-[#121316] transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-neutral-700 hover:text-[#121316] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Tech Insights Column */}
          <div className="col-span-2 md:col-span-2 lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500 mb-4">
              Engineering Dispatch
            </h4>
            <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
              Quarterly perspectives on distributed computing, LLM operations, and cloud architecture from Durozen Technologies.
            </p>

            {subscribed ? (
              <div className="p-3 bg-white rounded-xl border border-black/5 flex items-center gap-2 text-xs font-semibold text-[#549B31]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Subscribed to engineering updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-black/10 focus:outline-none focus:border-[#24419E] text-[#121316] placeholder:text-neutral-400"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-[#121316] text-white text-xs font-semibold hover:bg-[#24419E] transition-colors shrink-0 shadow-sm"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
            <span>© 2026 Durozen Technologies Pvt. Ltd. All rights reserved.</span>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <Link
                href="/privacy"
                className="hover:text-[#121316] transition-colors"
              >
                Privacy Policy
              </Link>
              <span>•</span>
              <Link
                href="/terms"
                className="hover:text-[#121316] transition-colors"
              >
                Terms of Service
              </Link>
              <span>•</span>
              <Link
                href="/cookies"
                className="hover:text-[#121316] transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 text-center sm:text-right">
            <span>Your Trusted Digital Transformation Partner</span>
          </div>
        </div>
        </FadeIn>
      </div>
    </footer>
  );
}
