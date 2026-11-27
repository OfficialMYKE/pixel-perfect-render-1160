import type { ReactNode } from "react";
import AnnouncementBar from "@/components/ui/announcement-bar";
import VintageNavbar from "@/components/ui/vintage-navbar";
import Footer from "@/components/ui/footer";

export default function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <AnnouncementBar />
      <VintageNavbar />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
