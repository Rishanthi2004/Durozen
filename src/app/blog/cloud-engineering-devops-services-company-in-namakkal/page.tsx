import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import CloudEngineeringDevopsNamakkalBlog from "@/components/blog/CloudEngineeringDevopsNamakkalBlog";

export const metadata: Metadata = {
  title: "Cloud Engineering & DevOps Services Company in Namakkal | AWS, GCP & CI/CD - Durozen",
  description:
    "Looking for a cloud engineering and DevOps services company in Namakkal? Durozen architects auto-scaling AWS/GCP infrastructure, Kubernetes clusters, and CI/CD pipelines.",
  alternates: {
    canonical: "/blog/cloud-engineering-devops-services-company-in-namakkal",
  },
  openGraph: {
    title: "Cloud Engineering & DevOps Services Company in Namakkal | AWS, GCP & CI/CD - Durozen",
    description:
      "Looking for a cloud engineering and DevOps services company in Namakkal? Durozen architects auto-scaling AWS/GCP infrastructure, Kubernetes clusters, and CI/CD pipelines.",
    url: "https://durozen.in/blog/cloud-engineering-devops-services-company-in-namakkal",
    type: "article",
    siteName: "Durozen Technologies",
  },
};

export default function CloudEngineeringDevopsNamakkalPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 flex flex-col">
      <Navbar animateLogo={false} />
      <main className="flex-1 pt-24 sm:pt-28">
        <CloudEngineeringDevopsNamakkalBlog />
      </main>
      <Footer />
    </div>
  );
}
