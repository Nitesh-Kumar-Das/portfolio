import { z } from "zod";

/**
 * One schema, imported by BOTH the form and the route handler.
 *
 * The client copy gives instant feedback; the server copy is the one that
 * actually matters, since anything can POST to the endpoint directly. Keeping
 * them in one file is what stops the two from drifting apart.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please add your name.").max(100),
  email: z.string().trim().email("That doesn't look like an email address.").max(200),
  message: z
    .string()
    .trim()
    .min(10, "A little more detail, please. At least 10 characters.")
    .max(5000, "That's a bit long. Please keep it under 5000 characters."),
  /**
   * Honeypot. Hidden from people, irresistible to naive bots.
   *
   * It must ACCEPT any value here and be discarded later by the route. If the
   * schema rejected a filled value, the bot would get a 400 telling it exactly
   * which field to leave blank next time, and a real visitor whose browser
   * autofills "company" would see an error on a field they cannot even see.
   */
  company: z.string().max(200).optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;
