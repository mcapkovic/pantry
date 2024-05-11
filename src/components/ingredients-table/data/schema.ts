import { z } from "zod"

export const optionsSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type OptionItem = z.infer<typeof optionsSchema>

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const itemSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: optionsSchema.or(z.null()) ,
  storageLocation: optionsSchema.or(z.null()),
  quantity: z.number(),
})

export type Item = z.infer<typeof itemSchema>

