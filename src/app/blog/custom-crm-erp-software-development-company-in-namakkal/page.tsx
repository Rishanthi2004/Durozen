import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import CrmErpSoftwareCompanyNamakkalBlog from "@/components/blog/CrmErpSoftwareCompanyNamakkalBlog";

export const metadata: Metadata = {
  title: "Custom CRM & ERP Software Development Company in Namakkal | Durozen",
  description:
    "Looking for a custom CRM and ERP software development company in Namakkal? Durozen builds real-time billing, inventory, ledger, and sales pipeline platforms.",
  alternates: {
    canonical: "/blog/custom-crm-erp-software-development-company-in-namakkal",
  },
  openGraph: {
    title: "Custom CRM & ERP Software Development Company in Namakkal | Durozen",
    description:
      "Looking for a custom CRM and ERP software development company in Namakkal? Durozen builds real-time billing, inventory, ledger, and sales pipeline platforms.",
    url: "https://durozen.in/blog/custom-crm-erp-software-development-company-in-namakkal",
    type: "article",
    siteName: "Durozen Technologies",
  },
};

export default function CrmErpSoftwareCompanyNamakkalPage() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 flex flex-col">
      <Navbar animateLogo={false} />
      <main className="flex-1 pt-24 sm:pt-28">
        <CrmErpSoftwareCompanyNamakkalBlog />
      </main>
      <Footer />
    </div>
  );
}
