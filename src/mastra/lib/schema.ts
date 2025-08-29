import { z } from 'zod'

export const OptionsSchema = z
  .object({
    person: z.string().optional(),
    targetPriceFrom: z.string().optional(),
    targetPriceTo: z.string().optional(),
    isOneWay: z.boolean().optional(),
  })
  .optional()

export const AirflightInput = z.object({
  from: z.string(),
  to: z.string(),
  options: OptionsSchema,
})

const SearchResultSchema = z.array(
  z.object({
    title: z.string(),
    url: z.string(),
    content: z.string(),
    rawContent: z.string().optional(),
    score: z.number(),
    publishedDate: z.string(),
  })
)

export const AirflightToolResult = z.object({
  data: SearchResultSchema,
  options: OptionsSchema,
})

export const Data = z.array(
  z.object({
    url: z.string(),
    price: z.string(),
    starting_date: z.string(),
    ending_date: z.string(),
  })
)

export const AirflightState = z.object({
  data: Data,
  options: OptionsSchema,
})
