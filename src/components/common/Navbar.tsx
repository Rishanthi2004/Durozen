"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronRight } from "lucide-react";
import DurozenLogo from "./Logo";

interface NavbarProps {
  animateLogo?: boolean;
  onLogoSettled?: () => void;
}

export default function Navbar({
  animateLogo = true,
  onLogoSettled,
}: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/solutions", label: "Solutions" },
    { href: "/projects", label: "Projects" },
    { href: "/gallery", label: "Gallery" },
    { href: "/blog", label: "Blog" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ];

  const handleLogoComplete = () => {
    if (onLogoSettled) {
      onLogoSettled();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAF9F6]/90 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-b border-black/[0.06] py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with 4 falling circles bounce animation */}
          <Link
            href="/"
            className="flex items-center group transition-transform active:scale-95 shrink-0"
          >
            <DurozenLogo
              size="md"
              animated={animateLogo}
              onAnimationComplete={handleLogoComplete}
              showSubtitle={false}
            />
          </Link>

          {/* Desktop Navigation Links - Fades in */}
          <motion.nav
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:flex items-center gap-0.5 xl:gap-1 px-2.5 xl:px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-black/[0.05] shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-2.5 xl:px-3.5 py-1.5 text-xs xl:text-sm font-medium tracking-tight rounded-full transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? "text-[#121316] font-semibold bg-[#FAF9F6] shadow-sm"
                      : "text-neutral-600 hover:text-[#121316] hover:bg-black/[0.02]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 rounded-full border border-black/[0.08] -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </motion.nav>

          {/* Header Action CTA - Fades in */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="hidden lg:flex items-center gap-3 shrink-0"
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full bg-[#121316] text-white text-xs xl:text-sm font-semibold tracking-tight shadow-sm hover:bg-[#DE2F28] transition-colors duration-200 whitespace-nowrap"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2.5 rounded-xl bg-white border border-black/[0.08] text-[#121316] hover:bg-neutral-50 transition-colors shadow-sm"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-[#FAF9F6] border-b border-black/[0.08] shadow-lg"
          >
            <div className="px-5 pt-3 pb-6 flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-white font-bold text-[#121316] shadow-sm border border-black/[0.06]"
                        : "text-neutral-700 hover:bg-white/60"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-neutral-400" />
                  </Link>
                );
              })}

              <div className="pt-3 mt-1 border-t border-black/[0.06]">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#DE2F28] text-white text-sm font-semibold shadow-sm hover:bg-[#c9241e]"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>

  );
}
