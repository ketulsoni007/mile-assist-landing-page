import { z } from "zod";

export const INQUIRY_TYPES = ["Driver App", "Hotel / Restaurant", "Admin / Enterprise", "Sales Partnership"] as const;

/** Shared by the form (client) and the API route (server), so both validate the same way. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s-]/g, ""))
    .pipe(z.string().regex(/^(\+91)?[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number")),
  type: z.enum(INQUIRY_TYPES, { message: "Please choose an inquiry type" }),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)").max(1500),
  consent: z.literal(true, { message: "Please tick the box so we can contact you" }),
  // anti-spam (invisible to people): honeypot must stay empty, form must take > 3s to fill
  website: z.string().max(200).optional(), // honeypot: checked (silently) in the API route
  startedAt: z.number().optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
