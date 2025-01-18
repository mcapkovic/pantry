import { z } from "zod";

export const ingredientFormSchema = z.object({
  name: z.string().min(2, {
    message: "Nazov musi mat aspon 2 znaky.",
  }),
  category: z.string().optional(),
  location: z.string().optional(),
  pieces: z.string().optional(),
  expirationDate: z.date().optional(),
}); 