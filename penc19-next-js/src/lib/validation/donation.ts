import { z } from "zod";

export const donationSchema = z.object({
  name: z.string().min(1),
  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .min(1000, "Minimum donation is 1,000 FCFA"),
  language: z.string(),
});

export type DonationInput = z.infer<typeof donationSchema>;
