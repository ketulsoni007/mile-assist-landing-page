import { contactSchema } from "@/lib/contact-schema";

/**
 * Contact form endpoint.
 * Spam protection without a paid service: a hidden honeypot field, a minimum fill time, and a simple
 * per-IP rate limit (in memory: resets on restart / per server instance).
 * Delivery: set CONTACT_WEBHOOK_URL (e.g. a Google Apps Script, Slack, Zapier/Make or your backend URL)
 * and every valid inquiry is POSTed there as JSON. Without it, inquiries are only logged on the server.
 */
const hits = new Map<string, number[]>();
const LIMIT = 5; // per IP
const WINDOW_MS = 10 * 60 * 1000;

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) return Response.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
  hits.set(ip, [...recent, now]);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: parsed.error.issues[0]?.message ?? "Invalid form" }, { status: 400 });
  }
  const { website, startedAt, ...data } = parsed.data;

  // bots: filled the hidden field or submitted inhumanly fast. Pretend success so they do not retry.
  if (website || (startedAt && now - startedAt < 3000)) return Response.json({ ok: true });

  const inquiry = { ...data, receivedAt: new Date(now).toISOString(), consentText: "Email/SMS/WhatsApp/Call, overrides DND/NDNC" };

  const hook = process.env.CONTACT_WEBHOOK_URL;
  if (hook) {
    const res = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(inquiry) }).catch(() => null);
    if (!res || !res.ok) return Response.json({ ok: false, error: "Could not send right now. Please try again." }, { status: 502 });
  } else {
    console.warn("[contact] CONTACT_WEBHOOK_URL not set; inquiry only logged:", inquiry);
  }
  return Response.json({ ok: true });
}
