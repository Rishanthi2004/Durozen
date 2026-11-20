import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import SoftwareCompanyCustomErpSaasNamakkalBlog from "@/components/blog/SoftwareCompanyCustomErpSaasNamakkalBlog";

export const metadata: Metadata = {
  title: "Custom ERP, CRM & SaaS Development: Why Partner with a Software Company in Namakkal | Durozen",
  description:
    "Looking for a software company in Namakkal to build custom ERP, CRM, or SaaS products? Learn how Durozen engineers scalable multi-tenant software with full IP ownership.",
  alternates: {
    canonical: "/blog/software-company-in-namakkal-custom-erp-crm-saas",
  },
  openGraph: {
    title: "Custom ERP, CRM & SaaS Development: Why Partner with a Software Company in Namakkal | Durozen",
    description:
      "Looking for a software company in Namakkal to build custom ERP, CRM, or SaaS products? Learn how Durozen engineers scalable multi-tenant software with full IP ownership.",
    url: "https://durozen.in/blog/software-company-in-namakkal-custom-erp-crm-saas",
    type: "article",
    siteName: "Durozen Technologies",
  },
};

export default function SoftwareCompanyCustomErpSaasNamakkalPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 flex flex-col">
      <Navbar animateLogo={false} />
      <main className="flex-1 pt-24 sm:pt-28">
        <SoftwareCompanyCustomErpSaasNamakkalBlog />
      </main>
      <Footer />
    </div>
  );
}
