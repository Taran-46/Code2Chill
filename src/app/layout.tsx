import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/effects/smooth-scroll";
import { CustomCursor } from "@/components/effects/custom-cursor";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: "%s | Code2Chill — Chitkara University",
    default: "Code2Chill — Student Technical Community | Chitkara University",
  },
  description:
    "Official website of Code2Chill, a student-led technical club at Chitkara University. Learn, build, and connect through workshops, hackathons, and collaborative open projects.",
  keywords: [
    "Code2Chill",
    "Chitkara University",
    "Technical Club",
    "Coding Community",
    "Web Development",
    "Hackathons",
    "Student Developers",
  ],
  authors: [{ name: "Code2Chill Technical Team" }],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="flex min-h-screen flex-col bg-canvas text-ink antialiased selection:bg-brand-blue selection:text-white">
        <SmoothScroll />
        <CustomCursor />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
