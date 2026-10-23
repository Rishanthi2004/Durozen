"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  LayoutGrid,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Share2,
  Heart,
  Plus,
  X,
  Maximize2,
  Download,
  Check,
  Info,
  Calendar,
  Sparkles,
} from "lucide-react";
import {
  galleryItems,
  galleryCategories,
  type GalleryItem,
  type GalleryCategory,
} from "@/data/galleryData";

export default function GalleryExperience() {
  const [viewMode, setViewMode] = useState<"deck" | "grid">("deck");
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Filter items based on category and search query
  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Show transient toast
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  }, []);

  const safeIndex =
    filteredItems.length === 0
      ? 0
      : currentIndex >= filteredItems.length
      ? filteredItems.length - 1
      : currentIndex;

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
  }, [filteredItems.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
  }, [filteredItems.length]);

  const handleLightboxPrev = useCallback(() => {
    if (filteredItems.length === 0) return;
    setLightboxIndex((prev) => {
      const newIdx = prev > 0 ? prev - 1 : filteredItems.length - 1;
      setLightboxItem(filteredItems[newIdx]);
      return newIdx;
    });
  }, [filteredItems]);

  const handleLightboxNext = useCallback(() => {
    if (filteredItems.length === 0) return;
    setLightboxIndex((prev) => {
      const newIdx = prev < filteredItems.length - 1 ? prev + 1 : 0;
      setLightboxItem(filteredItems[newIdx]);
      return newIdx;
    });
  }, [filteredItems]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxItem) {
        if (e.key === "ArrowLeft") handleLightboxPrev();
        if (e.key === "ArrowRight") handleLightboxNext();
        if (e.key === "Escape") setLightboxItem(null);
        return;
      }

      if (viewMode === "deck" && filteredItems.length > 0) {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxItem, viewMode, filteredItems.length, handleLightboxPrev, handleLightboxNext, handlePrev, handleNext]);

  const activeItem = filteredItems[safeIndex] || filteredItems[0];

  const handleShare = async (item?: GalleryItem) => {
    const target = item || activeItem;
    if (!target) return;
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({
          title: target.title,
          text: `Check out ${target.title} on the Durozen Technologies Gallery!`,
          url: shareUrl,
        });
        showToast("Shared successfully!");
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      showToast("Gallery link copied to clipboard!");
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = !prev[id];
      if (next) {
        showToast("Added to your saved highlights!");
      } else {
        showToast("Removed from saved highlights");
      }
      return { ...prev, [id]: next };
    });
  };

  const openLightbox = (item: GalleryItem) => {
    const idx = filteredItems.findIndex((it) => it.id === item.id);
    setLightboxIndex(idx >= 0 ? idx : 0);
    setLightboxItem(item);
  };

  const handleDownload = (item: GalleryItem) => {
    const link = document.createElement("a");
    link.href = item.src;
    link.download = `${item.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Download started!");
    setIsMoreMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121316] selection:bg-[#24419E] selection:text-white pt-28 sm:pt-32 pb-24 overflow-x-hidden relative">
      {/* Background Ambient Depth Glows Matching Website Theme */}
      <div className="absolute top-0 right-0 w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] bg-gradient-to-b from-[#FAF9F6] via-[#F4F3EE]/60 to-transparent rounded-full blur-2xl -z-20 pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-[#DE2F28]/3 rounded-full blur-3xl -z-20 pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#24419E]/3 rounded-full blur-3xl -z-20 pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Control Bar Matching Reference Image Layout */}
        <div className="flex items-center justify-between gap-4 py-4 mb-2">
          {/* Top Left: View Mode Toggle Icons (Journal / Deck & Grid) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("deck")}
              aria-label="3D Stacked Deck View"
              title="3D Stacked View"
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 ${
                viewMode === "deck"
                  ? "bg-[#121316] text-white border-[#121316] shadow-md"
                  : "bg-white border-black/[0.08] text-neutral-600 hover:text-[#121316] hover:bg-neutral-50 shadow-sm"
              }`}
            >
              <BookOpen className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              aria-label="Grid Gallery View"
              title="Grid View"
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 ${
                viewMode === "grid"
                  ? "bg-[#121316] text-white border-[#121316] shadow-md"
                  : "bg-white border-black/[0.08] text-neutral-600 hover:text-[#121316] hover:bg-neutral-50 shadow-sm"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          {/* Top Center: 3 Tiny Dots Indicator */}
          <div className="flex items-center gap-1.5 text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
          </div>

          {/* Top Right: Search & Category Drawer Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search Gallery"
              title="Search"
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 ${
                isSearchOpen
                  ? "bg-[#121316] text-white border-[#121316] shadow-md"
                  : "bg-white border-black/[0.08] text-neutral-600 hover:text-[#121316] hover:bg-neutral-50 shadow-sm"
              }`}
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              aria-label="Filter Categories"
              title="Categories"
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 ${
                isFilterDrawerOpen || selectedCategory !== "All"
                  ? "bg-[#121316] text-white border-[#121316] shadow-md"
                  : "bg-white border-black/[0.08] text-neutral-600 hover:text-[#121316] hover:bg-neutral-50 shadow-sm"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Header Heading & Subtitle Inspired by Reference */}
        <div className="text-center mt-2 mb-6 sm:mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#121316] font-sans"
          >
            Our Gallery
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center gap-2.5 mt-2.5 text-xs sm:text-sm text-neutral-600 font-medium"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/[0.08] text-[#121316] font-semibold tracking-wide text-[11px] sm:text-xs shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#F4A81E]" />
              {filteredItems.length} Moments & Milestones
            </span>
            <span className="hidden sm:inline text-neutral-400">•</span>
            <span className="hidden sm:inline text-neutral-600">
              A closer look at our work, team, and journey.
            </span>
          </motion.div>
        </div>

        {/* Expandable Search Input Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-md mx-auto mb-6 overflow-hidden"
            >
              <div className="relative">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by title, event, client, or tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-10 pr-10 py-2.5 rounded-full bg-white border border-black/[0.08] text-[#121316] placeholder-neutral-400 text-sm focus:outline-none focus:border-[#121316] shadow-sm transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#121316]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-6 sm:mb-8 no-scrollbar"
        >
          {galleryCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count =
              cat === "All"
                ? galleryItems.length
                : galleryItems.filter((it) => it.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                  isSelected
                    ? "bg-[#121316] text-white border-[#121316] shadow-sm font-bold scale-[1.02]"
                    : "bg-white border-black/[0.07] text-neutral-600 hover:text-[#121316] hover:bg-neutral-50 shadow-sm"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-white/20 text-white" : "bg-black/[0.05] text-neutral-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-lg text-neutral-800 font-semibold">No moments found</p>
            <p className="text-sm text-neutral-500 mt-1">
              Try adjusting your search query or selecting a different category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-5 px-5 py-2 rounded-full bg-[#121316] text-white text-xs font-bold hover:bg-black transition-colors shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* MODE 1: 3D STACKED-CARD DECK (Cover-flow matching reference composition) */}
        {viewMode === "deck" && filteredItems.length > 0 && (
          <div className="relative pt-4 pb-10 overflow-hidden">
            {/* 3D Perspective Stage */}
            <div
              className="relative w-full flex items-center justify-center min-h-[460px] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[620px]"
              style={{ perspective: 1200 }}
            >
              {/* Floor Shadow beneath stacked cards */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[70vw] max-w-[580px] h-12 bg-black/10 rounded-full blur-2xl pointer-events-none -z-10" />

              {/* Navigation Chevrons on Desktop */}
              <button
                onClick={handlePrev}
                aria-label="Previous image"
                className="hidden md:flex absolute left-4 lg:left-12 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/90 hover:bg-white border border-black/[0.08] backdrop-blur-md items-center justify-center text-[#121316] transition-all duration-200 active:scale-95 hover:scale-105 shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next image"
                className="hidden md:flex absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/90 hover:bg-white border border-black/[0.08] backdrop-blur-md items-center justify-center text-[#121316] transition-all duration-200 active:scale-95 hover:scale-105 shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Stack of Cards */}
              <div className="relative w-[270px] min-[380px]:w-[300px] sm:w-[440px] md:w-[520px] lg:w-[600px] h-[360px] min-[380px]:h-[390px] sm:h-[450px] md:h-[500px] lg:h-[530px] flex items-center justify-center">
                {filteredItems.map((item, index) => {
                  const offset = index - currentIndex;
                  const isCenter = offset === 0;

                  // Render only visible window around active card (-4 to +4)
                  if (Math.abs(offset) > 4) return null;

                  // Compute 3D stacked placement
                  const xOffset =
                    offset === 0
                      ? 0
                      : offset < 0
                      ? offset * 52 - 35
                      : offset * 52 + 35;

                  const rotateY =
                    offset === 0
                      ? 0
                      : offset < 0
                      ? Math.min(22, 14 + Math.abs(offset) * 2)
                      : -Math.min(22, 14 + Math.abs(offset) * 2);

                  const scale =
                    offset === 0
                      ? 1
                      : Math.max(0.72, 1 - Math.abs(offset) * 0.08);

                  const zIndex = 30 - Math.abs(offset) * 2;
                  const opacity =
                    offset === 0
                      ? 1
                      : Math.max(0.35, 1 - Math.abs(offset) * 0.18);

                  return (
                    <motion.div
                      key={item.id}
                      animate={{
                        x: xOffset,
                        scale,
                        rotateY,
                        opacity,
                        zIndex,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 28,
                      }}
                      drag={isCenter ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(e, { offset: dragOffset }) => {
                        if (dragOffset.x < -45) handleNext();
                        else if (dragOffset.x > 45) handlePrev();
                      }}
                      onClick={() => {
                        if (isCenter) {
                          openLightbox(item);
                        } else {
                          setCurrentIndex(index);
                        }
                      }}
                      className={`absolute inset-0 cursor-pointer select-none rounded-[26px] sm:rounded-[32px] overflow-hidden border transition-shadow duration-300 ${
                        isCenter
                          ? "border-black/[0.08] shadow-[0_24px_50px_-10px_rgba(0,0,0,0.18),0_4px_24px_rgba(36,65,158,0.08)] bg-white"
                          : "border-black/[0.06] shadow-[0_12px_28px_rgba(0,0,0,0.1)] hover:border-black/20 bg-white"
                      }`}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* Photo Image */}
                      <div className="relative w-full h-full bg-[#121316]">
                        <Image
                          src={item.src}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 300px, (max-width: 1024px) 520px, 600px"
                          priority={isCenter}
                          className="object-cover pointer-events-none"
                        />

                        {/* Top Gradient Header Overlay */}
                        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/70 via-black/30 to-transparent pointer-events-none" />

                        {/* Top Badges */}
                        <div className="absolute top-4 sm:top-5 inset-x-4 sm:inset-x-5 flex items-center justify-between pointer-events-none">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-black/[0.08] text-[#121316] text-[10px] sm:text-xs font-semibold tracking-wide shadow-sm">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                item.accent === "red"
                                  ? "bg-[#DE2F28]"
                                  : item.accent === "orange"
                                  ? "bg-[#F4A81E]"
                                  : item.accent === "green"
                                  ? "bg-[#549B31]"
                                  : "bg-[#24419E]"
                              }`}
                            />
                            {item.category}
                          </span>

                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-neutral-700 text-[10px] sm:text-xs font-medium border border-black/[0.08] shadow-sm">
                            <Calendar className="w-3 h-3 text-neutral-500" />
                            {item.date}
                          </span>
                        </div>

                        {/* Bottom Vignette & Information */}
                        <div className="absolute bottom-0 inset-x-0 pt-16 pb-5 sm:pb-6 px-5 sm:px-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col justify-end">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-white/70">
                              {item.tag}
                            </span>
                          </div>

                          <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-white tracking-tight leading-snug line-clamp-2">
                            {item.title}
                          </h3>

                          {isCenter && (
                            <motion.p
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-xs sm:text-sm text-neutral-200 mt-2 line-clamp-2 leading-relaxed"
                            >
                              {item.description}
                            </motion.p>
                          )}

                          {isCenter && (
                            <div className="mt-3 flex items-center justify-between text-[11px] text-white/70 pt-2 border-t border-white/15">
                              <span className="flex items-center gap-1 hover:text-white transition-colors">
                                <Maximize2 className="w-3.5 h-3.5" />
                                Click card to expand fullscreen
                              </span>
                              <span className="text-white/50">
                                {currentIndex + 1} / {filteredItems.length}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Floating Action Dock (Directly Inspired by Reference Image) */}
            <div className="flex items-center justify-center mt-6 sm:mt-8">
              <div className="relative flex items-center gap-3 sm:gap-4 px-4 py-2.5 rounded-full bg-white/95 backdrop-blur-xl border border-black/[0.08] shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
                {/* 1. More Options Button */}
                <div className="relative">
                  <button
                    onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                    aria-label="More Options"
                    title="More Options"
                    className="w-11 h-11 rounded-full bg-[#FAF9F6] border border-black/[0.08] text-[#121316] hover:bg-neutral-100 flex items-center justify-center transition-transform active:scale-90 shadow-sm"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>

                  <AnimatePresence>
                    {isMoreMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-14 left-0 w-52 rounded-2xl bg-white border border-black/[0.08] shadow-2xl p-2 z-50 text-xs text-[#121316]"
                      >
                        <button
                          onClick={() => {
                            if (activeItem) openLightbox(activeItem);
                            setIsMoreMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-neutral-700 hover:text-[#121316] hover:bg-neutral-100 transition-colors"
                        >
                          <Maximize2 className="w-4 h-4 text-[#24419E]" />
                          View Fullscreen
                        </button>
                        <button
                          onClick={() => activeItem && handleDownload(activeItem)}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-neutral-700 hover:text-[#121316] hover:bg-neutral-100 transition-colors"
                        >
                          <Download className="w-4 h-4 text-[#549B31]" />
                          Download Photo
                        </button>
                        <button
                          onClick={() => {
                            setIsInfoModalOpen(true);
                            setIsMoreMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-neutral-700 hover:text-[#121316] hover:bg-neutral-100 transition-colors"
                        >
                          <Info className="w-4 h-4 text-[#F4A81E]" />
                          Image Details
                        </button>
                        <div className="my-1 border-t border-black/[0.06]" />
                        <button
                          onClick={() => {
                            setIsAdminModalOpen(true);
                            setIsMoreMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-neutral-500 hover:text-[#121316] hover:bg-neutral-100 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-[#DE2F28]" />
                          Admin Console
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 2. Share Button */}
                <button
                  onClick={() => handleShare()}
                  aria-label="Share Photo"
                  title="Share"
                  className="w-11 h-11 rounded-full bg-[#FAF9F6] border border-black/[0.08] text-[#121316] hover:bg-neutral-100 flex items-center justify-center transition-transform active:scale-90 shadow-sm"
                >
                  <Share2 className="w-5 h-5" />
                </button>

                {/* 3. Favorite / Bookmark Button (Visitor Friendly) */}
                <button
                  onClick={() => activeItem && toggleFavorite(activeItem.id)}
                  aria-label="Save to Highlights"
                  title="Save to Highlights"
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-transform active:scale-90 shadow-sm border ${
                    activeItem && favorites[activeItem.id]
                      ? "bg-[#DE2F28] text-white border-[#DE2F28]"
                      : "bg-[#FAF9F6] border-black/[0.08] text-[#121316] hover:bg-neutral-100"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      activeItem && favorites[activeItem.id]
                        ? "fill-white"
                        : ""
                    }`}
                  />
                </button>

                {/* 4. Add / Details Info Button */}
                <button
                  onClick={() => setIsInfoModalOpen(true)}
                  aria-label="Image Information"
                  title="Details & Info"
                  className="w-11 h-11 rounded-full bg-[#FAF9F6] border border-black/[0.08] text-[#121316] hover:bg-neutral-100 flex items-center justify-center transition-transform active:scale-90 shadow-sm"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mobile Swipe Hint */}
            <p className="text-center text-neutral-500 text-xs mt-4 md:hidden">
              Swipe left or right to explore moments
            </p>
          </div>
        )}

        {/* MODE 2: RESPONSIVE GRID GALLERY VIEW */}
        {viewMode === "grid" && filteredItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4 pb-12"
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => openLightbox(item)}
                className="group relative bg-white rounded-2xl overflow-hidden border border-black/[0.08] hover:border-black/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] cursor-pointer flex flex-col"
              >
                {/* Photo Thumbnail */}
                <div className="relative aspect-[4/3] w-full bg-[#121316] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-black/[0.08] text-[10px] font-semibold text-[#121316] shadow-sm">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.accent === "red"
                            ? "bg-[#DE2F28]"
                            : item.accent === "orange"
                            ? "bg-[#F4A81E]"
                            : item.accent === "green"
                            ? "bg-[#549B31]"
                            : "bg-[#24419E]"
                        }`}
                      />
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="p-2 rounded-full bg-white text-[#121316] shadow-md flex items-center justify-center">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                      {item.tag}
                    </span>
                    <h3 className="text-sm font-bold text-[#121316] group-hover:text-[#24419E] transition-colors mt-1 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-600 mt-1.5 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-3 mt-3 border-t border-black/[0.06]">
                    <span>{item.date}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(item);
                      }}
                      className="text-neutral-500 hover:text-[#121316] transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6"
          >
            {/* Top Lightbox Bar */}
            <div className="flex items-center justify-between z-20">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      lightboxItem.accent === "red"
                        ? "bg-[#DE2F28]"
                        : lightboxItem.accent === "orange"
                        ? "bg-[#F4A81E]"
                        : lightboxItem.accent === "green"
                        ? "bg-[#549B31]"
                        : "bg-[#24419E]"
                    }`}
                  />
                  {lightboxItem.category}
                </span>
                <span className="text-xs text-neutral-400 hidden sm:inline">
                  {lightboxIndex + 1} of {filteredItems.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare(lightboxItem)}
                  aria-label="Share"
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDownload(lightboxItem)}
                  aria-label="Download"
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLightboxItem(null)}
                  aria-label="Close"
                  className="p-2.5 rounded-full bg-white/10 hover:bg-[#DE2F28] text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Center Image Container with Side Controls */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              <button
                onClick={handleLightboxPrev}
                aria-label="Previous"
                className="absolute left-2 sm:left-6 z-30 p-3 rounded-full bg-black/50 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="relative max-w-5xl max-h-[72vh] w-full h-full flex items-center justify-center">
                <Image
                  src={lightboxItem.src}
                  alt={lightboxItem.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              <button
                onClick={handleLightboxNext}
                aria-label="Next"
                className="absolute right-2 sm:right-6 z-30 p-3 rounded-full bg-black/50 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption & Information */}
            <div className="max-w-3xl mx-auto w-full text-center z-20">
              <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                {lightboxItem.title}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1.5 leading-relaxed max-w-2xl mx-auto">
                {lightboxItem.description}
              </p>
              <div className="flex items-center justify-center gap-3 mt-3 text-xs text-neutral-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#F4A81E]" />
                  {lightboxItem.date}
                </span>
                <span>•</span>
                <span>Durozen Technologies</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DETAILS & INFO MODAL */}
      <AnimatePresence>
        {isInfoModalOpen && activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-black/[0.08] rounded-3xl max-w-md w-full p-6 text-[#121316] shadow-2xl relative"
            >
              <button
                onClick={() => setIsInfoModalOpen(false)}
                className="absolute top-5 right-5 text-neutral-400 hover:text-[#121316]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#DE2F28]" />
                <span className="text-xs font-bold tracking-widest uppercase text-neutral-500">
                  Moment Overview
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#121316]">{activeItem.title}</h3>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                {activeItem.description}
              </p>

              <div className="mt-5 space-y-2.5 bg-[#FAF9F6] rounded-2xl p-4 border border-black/[0.06] text-xs">
                <div className="flex justify-between py-1 border-b border-black/[0.05]">
                  <span className="text-neutral-500">Category</span>
                  <span className="font-semibold text-[#121316]">{activeItem.category}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-black/[0.05]">
                  <span className="text-neutral-500">Location / Context</span>
                  <span className="font-semibold text-[#121316]">{activeItem.date}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-black/[0.05]">
                  <span className="text-neutral-500">Focus Tag</span>
                  <span className="font-semibold text-[#121316]">{activeItem.tag}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-500">Organization</span>
                  <span className="font-semibold text-[#121316]">Durozen Technologies Pvt. Ltd.</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    handleDownload(activeItem);
                    setIsInfoModalOpen(false);
                  }}
                  className="flex-1 py-3 rounded-full bg-[#121316] text-white text-xs font-bold hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={() => {
                    handleShare(activeItem);
                    setIsInfoModalOpen(false);
                  }}
                  className="flex-1 py-3 rounded-full bg-[#FAF9F6] border border-black/[0.08] text-[#121316] text-xs font-bold hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADMIN CONSOLE MODAL */}
      <AnimatePresence>
        {isAdminModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-black/[0.08] rounded-3xl max-w-md w-full p-6 text-[#121316] shadow-2xl relative"
            >
              <button
                onClick={() => setIsAdminModalOpen(false)}
                className="absolute top-5 right-5 text-neutral-400 hover:text-[#121316]"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold text-[#121316]">Gallery Administration</h3>
              <p className="text-xs text-neutral-500 mt-1">
                Content management privileges are currently in read-only verification mode for public website visitors.
              </p>

              <div className="my-5 p-4 rounded-2xl bg-[#FAF9F6] border border-black/[0.06] text-xs space-y-2">
                <p className="text-[#121316] font-medium">
                  • {galleryItems.length} Authentic Highlights Active
                </p>
                <p className="text-neutral-500">
                  • Storage: Local assets & public repository
                </p>
                <p className="text-neutral-500">
                  • Status: Production Ready
                </p>
              </div>

              <button
                onClick={() => setIsAdminModalOpen(false)}
                className="w-full py-2.5 rounded-full bg-[#121316] text-white text-xs font-bold hover:bg-black transition-colors shadow-sm"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOAST POPUP NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#121316] text-white text-xs font-bold shadow-2xl flex items-center gap-2 border border-black/10"
          >
            <Check className="w-4 h-4 text-[#549B31]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
