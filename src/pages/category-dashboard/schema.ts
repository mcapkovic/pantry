import { z } from "zod"

export const optionsSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type OptionItem = z.infer<typeof optionsSchema>

export const itemSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: optionsSchema.or(z.null()) ,
  location: optionsSchema.or(z.null()),
  quantity: z.number(),
})

export type Item = z.infer<typeof itemSchema>

