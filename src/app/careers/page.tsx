"use client";

import React, { useState, useRef } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import {
  Send,
  CheckCircle2,
  Code2,
  Sparkles,
  ShieldCheck,
  Zap,
  UploadCloud,
  FileText,
  X,
  AlertCircle,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from "@/components/common/MotionTransitions";
import InnovationCollaborationAnimation from "@/components/animations/InnovationCollaborationAnimation";

export default function CareersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    discipline: "Full-Stack Software Engineering",
    portfolioUrl: "",
    message: "",
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
  const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];

  const validateAndSetFile = (file: File) => {
    setFileError(null);
    setErrorMessage(null);

    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      setFileError("Invalid format. Only PDF, DOC, and DOCX files are accepted.");
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setFileError(`File size exceeds the 5 MB limit (${sizeMb} MB). Please upload a smaller file.`);
      return false;
    }

    setResumeFile(file);
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const success = validateAndSetFile(e.dataTransfer.files[0]);
      if (success && fileInputRef.current) {
        fileInputRef.current.files = e.dataTransfer.files;
      }
    }
  };

  const handleRemoveFile = () => {
    setResumeFile(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }
    return `${Math.round(bytes / 1024)} KB`;
  };

  const handleEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setFileError(null);

    // Validate mandatory resume
    if (!resumeFile) {
      setFileError("Please upload your Resume / CV (PDF, DOC, or DOCX up to 5 MB).");
      const uploadElement = document.getElementById("resume-upload-zone");
      if (uploadElement) {
        uploadElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("discipline", formData.discipline);
      payload.append("portfolioUrl", formData.portfolioUrl);
      payload.append("message", formData.message);
      payload.append("resume", resumeFile);

      // 1. Send multipart payload to backend Nodemailer API (for direct email attachments)
      const res = await fetch("/api/careers", {
        method: "POST",
        body: payload,
      });

      const result = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(result?.error || "Failed to submit career application.");
      }

      // 2. Also forward to Google Apps Script webhook if configured (for Google Sheets & MailApp sync)
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "";
      if (scriptUrl) {
        try {
          await fetch(scriptUrl, {
            method: "POST",
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify({
              ...formData,
              type: "career",
              resumeName: resumeFile.name,
              resumeSize: resumeFile.size,
            }),
            mode: "no-cors",
          });
        } catch (scriptErr) {
          console.warn("Google Apps Script sync warning:", scriptErr);
        }
      }

      if (result?.warning) {
        console.warn("[Careers]", result.warning);
      }

      setSubmitted(true);
    } catch (err: unknown) {
      console.error("Error submitting career application:", err);
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while sending your application. Please try again or email us directly at sachinn2413@gmail.com.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
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
                      setResumeFile(null);
                      setFileError(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
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

                  {/* Upload Resume / CV Field */}
                  <div id="resume-upload-zone" className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                        Upload Resume / CV *
                      </label>
                      <span className="text-[11px] font-medium text-neutral-500">
                        PDF, DOC, DOCX • Max 5 MB
                      </span>
                    </div>

                    {/* Hidden Native File Input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileChange}
                      className="hidden"
                      tabIndex={-1}
                      aria-label="Upload Resume or CV"
                    />

                    {!resumeFile ? (
                      /* Drag & Drop Upload Zone */
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative w-full rounded-2xl border-2 border-dashed p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 group ${
                          isDragging
                            ? "border-[#DE2F28] bg-red-50/50 scale-[1.005]"
                            : fileError
                            ? "border-red-300 bg-red-50/20 hover:border-[#DE2F28]/60"
                            : "border-black/15 bg-[#FAF9F6] hover:bg-white hover:border-[#DE2F28]/60"
                        }`}
                      >
                        <div className="flex flex-col items-center justify-center">
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-colors ${
                              isDragging
                                ? "bg-[#DE2F28] text-white"
                                : "bg-white text-neutral-600 shadow-sm border border-black/5 group-hover:text-[#DE2F28]"
                            }`}
                          >
                            <UploadCloud className="w-6 h-6 transition-transform group-hover:-translate-y-0.5 duration-200" />
                          </div>

                          <p className="text-sm font-semibold text-[#121316]">
                            <span className="text-[#DE2F28] underline underline-offset-2">
                              Click to browse
                            </span>{" "}
                            or drag & drop your resume here
                          </p>

                          <p className="text-xs text-neutral-500 mt-1">
                            Supports PDF, DOC, DOCX up to 5 MB (Mandatory)
                          </p>
                        </div>
                      </div>
                    ) : (
                      /* Selected File Preview Card */
                      <div className="w-full p-4 sm:p-5 rounded-2xl bg-white border border-black/10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-100 text-[#DE2F28] flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-bold text-[#121316] truncate">
                                {resumeFile.name}
                              </p>
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 shrink-0">
                                {resumeFile.name.split(".").pop()?.toUpperCase() || "CV"}
                              </span>
                            </div>
                            <p className="text-xs text-neutral-500 mt-0.5 font-medium">
                              {formatFileSize(resumeFile.size)} • Ready to submit
                            </p>
                          </div>
                        </div>

                        {/* Replace and Remove Actions */}
                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3.5 py-1.5 rounded-lg border border-black/10 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 hover:text-[#121316] transition-colors"
                          >
                            Replace
                          </button>
                          <button
                            type="button"
                            onClick={handleRemoveFile}
                            title="Remove selected resume"
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {fileError && (
                      <div className="flex items-start gap-1.5 text-xs text-red-600 font-medium pt-1">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{fileError}</span>
                      </div>
                    )}
                  </div>

                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs leading-relaxed">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-[#DE2F28] text-white font-bold text-sm tracking-tight shadow-md hover:bg-[#c9241e] transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting Application...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Career Enquiry</span>
                      </>
                    )}
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
