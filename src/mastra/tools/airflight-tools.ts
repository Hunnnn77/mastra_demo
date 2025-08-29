import { createTool } from '@mastra/core'
import { AirflightInput, AirflightToolResult } from '../lib/schema'
import { tavily } from '@tavily/core'
import { z } from 'zod'

export const airflightSearchTool = createTool({
  id: 'airflight-tool',
  description: 'get airfligt prices',
  inputSchema: AirflightInput,
  outputSchema: AirflightToolResult,
  execute: async ({ context }: { context: z.infer<typeof AirflightInput> }) => {
    const key = process.env.TAVILY_KEY
    if (!key) throw new Error('not existing key')
    const tvly = tavily({ apiKey: key })

    let query: string = ''
    query = `Search airflight cheapest price for the next three months from: ${context.from}, to: ${context.to}, person: ${context.options?.person || 1}`
    if (context.options) {
      if (context.options.targetPriceFrom && context.options.targetPriceTo) {
        query = `${query} The target price's range is from: $${context.options.targetPriceFrom} to: $${context.options.targetPriceTo}`
      }
    }
    query = `${query} The trip type: ${context.options?.isOneWay ? 'one-way' : 'round-trip'}`

    const now = new Date()
    const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
    const response = await tvly.search(query, {
      searchDepth: 'advanced',
      startDate: today,
      maxResults: 10,
    })
    return {
      data: response.results,
      ...context.options,
    }
  },
})
