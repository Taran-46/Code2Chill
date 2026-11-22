import React from "react";
import Link from "next/link";
import { ArrowUpRight, Instagram, Linkedin, Shield } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Container } from "./container";
import { mockSiteSettings } from "@/data/mock/site-settings";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-[#070B16] text-slate-300">
      <Container>
        {/* Main Footer Grid */}
        <div className="py-12 sm:py-16 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Identity Column */}
          <div className="md:col-span-2 lg:col-span-2 space-y-4">
            <Logo size="lg" inverted={true} />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {mockSiteSettings.description}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={mockSiteSettings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-700 text-slate-400 hover:text-brand-cyan hover:border-brand-cyan/40 hover:bg-slate-800/60 transition-colors"
                aria-label="Code2Chill Official Instagram"
                title="Code2Chill on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={mockSiteSettings.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-700 text-slate-400 hover:text-brand-cyan hover:border-brand-cyan/40 hover:bg-slate-800/60 transition-colors"
                aria-label="Code2Chill Official LinkedIn"
                title="Code2Chill on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <span className="text-xs text-slate-400 font-sans">
                Official Social Channels
              </span>
            </div>
          </div>

          {/* Column: Explore */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-sans">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/events" className="text-slate-400 hover:text-white transition-colors">
                  All Events
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-slate-400 hover:text-white transition-colors">
                  Member Projects
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-slate-400 hover:text-white transition-colors">
                  Photo Archive
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Community */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-sans">
              Community
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/team" className="text-slate-400 hover:text-white transition-colors">
                  Student Leadership & Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
              <li>
                <a
                  href="https://chitkara.edu.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                >
                  <span>Chitkara University</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column: Administration */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-sans">
              Administration
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Authorized student coordinators manage club publications securely.
            </p>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-brand-blue-light transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Coordinator Access</span>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Code2Chill · Chitkara University, Punjab. Student-led community.</p>
          <div className="flex items-center gap-4 text-slate-400 font-sans">
            <span>Asia/Kolkata (IST)</span>
            <span>·</span>
            <span>All rights reserved</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
