import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const itemSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string().or(z.null()) ,
  storageLocation: z.string().or(z.null()),
})

export type Item = z.infer<typeof itemSchema>
