import { createStep, createWorkflow } from '@mastra/core'
import { AirflightInput, AirflightState, Data } from '../lib/schema'
import { airflightSearchTool } from '../tools/airflight-tools'
import { z } from 'zod'

const step1 = createStep({
  id: 'step1',
  description: 'generate airflight ticket prices data',
  inputSchema: AirflightInput,
  outputSchema: AirflightState,
  execute: async ({ inputData, mastra, runtimeContext }) => {
    const toolResult = await airflightSearchTool.execute({
      context: inputData,
      runtimeContext,
    })
    const ag = mastra.getAgent('llm')
    const data = (await ag.generate(JSON.stringify(toolResult.data), {
      experimental_output: Data,
    })) as unknown as z.infer<typeof Data>

    return {
      data,
      ...inputData.options,
    }
  },
})

export const airFlightWorkflow = createWorkflow({
  steps: [step1],
  id: 'airflight-workflow',
  description: 'airflight-workflow',
  inputSchema: AirflightInput,
  outputSchema: AirflightState,
})
  .then(step1)
  .commit()
