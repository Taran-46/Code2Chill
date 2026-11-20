import React from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "404 — Page Not Found",
};

export default function NotFound() {
  return (
    <div className="py-24 sm:py-32">
      <Container size="narrow">
        <div className="rounded-2xl border border-border bg-surface p-8 sm:p-14 text-center space-y-6 shadow-subtle">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-canvas px-3 py-1 font-mono text-xs text-ink-muted">
            <span>HTTP Status 404</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-ink tracking-tight">
            Page Not Found
          </h1>

          <p className="editorial-lead text-base text-ink-muted max-w-md mx-auto">
            The page, event, or project you are looking for does not exist or may have been unlisted by club administrators.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link href="/">
              <Button variant="primary">
                <Home className="w-4 h-4" />
                <span>Return to Homepage</span>
              </Button>
            </Link>
            <Link href="/events">
              <Button variant="secondary">
                <span>Browse Events</span>
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
