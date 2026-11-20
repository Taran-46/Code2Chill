"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenId?: string;
  className?: string;
}

export function Accordion({ items, defaultOpenId, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn("divide-y divide-border rounded-xl border border-border bg-surface", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const buttonId = `accordion-btn-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <div key={item.id} className="transition-colors">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between py-4 px-5 text-left font-display font-semibold text-base sm:text-lg text-ink hover:text-brand-lime-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-ink-muted transition-transform duration-200 shrink-0 ml-4",
                    isOpen && "rotate-180 text-ink"
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={cn(
                "px-5 pb-5 pt-0 text-sm sm:text-base text-ink-muted leading-relaxed",
                !isOpen && "hidden"
              )}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
