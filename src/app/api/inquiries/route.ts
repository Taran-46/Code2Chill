import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/status";
import type { Database } from "@/types/database";

// Input validation schema
const inquirySchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name cannot exceed 100 characters"),
  email: z.string().trim().email("Please provide a valid email address").max(150),
  subject: z.string().trim().max(150, "Subject cannot exceed 150 characters").optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(3000, "Message cannot exceed 3000 characters"),
});

// Simple in-memory rate limiter: max 5 requests per IP per 10 minutes
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequests = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipRequests.get(ip);

  if (!record || now > record.expiresAt) {
    ipRequests.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Client IP tracking for anti-abuse protection
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many inquiries submitted from this connection. Please wait a few minutes before trying again.",
        },
        { status: 429 }
      );
    }

    // 2. Parse and validate body
    const body = await req.json();
    const result = inquirySchema.safeParse(body);

    if (!result.success) {
      const errorMsg = result.error.errors.map((e) => e.message).join(", ");
      return NextResponse.json(
        {
          success: false,
          error: errorMsg,
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    // 3. Database persistence when Supabase is configured
    if (isSupabaseConfigured()) {
      const adminClient = createAdminClient();
      if (adminClient) {
        const insertData: Database["public"]["Tables"]["contact_inquiries"]["Insert"] = {
          name,
          email,
          subject: subject ?? null,
          message,
          status: "new",
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (adminClient.from("contact_inquiries") as any).insert(insertData);

        if (error) {
          console.error("[Inquiry DB Insert Error]:", error);
          return NextResponse.json(
            {
              success: false,
              error: "Failed to securely record your inquiry. Please connect with us directly on Instagram or LinkedIn.",
            },
            { status: 500 }
          );
        }
      }
    } else {
      // Development mode log (when Supabase .env.local is not yet filled by user)
      console.log(`[Development Inquiry Recorded]: From: ${name} (${email}) | Subject: ${subject || "N/A"}`);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry successfully recorded. A student coordinator will review your submission.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Inquiry API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your request. Please try again.",
      },
      { status: 500 }
    );
  }
}
