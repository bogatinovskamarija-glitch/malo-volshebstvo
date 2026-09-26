import type { Metadata } from "next";
import { AboutContent } from "@/components/AboutContent";
export const metadata: Metadata = { title: "За мене" };
export default function AboutPage() {
  return (
    <main id="main-content" className="about-page">
      <AboutContent />
    </main>
  );
}
