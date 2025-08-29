import { Agent } from '@mastra/core'
import { model } from '../lib/model'
import { Memory } from '@mastra/memory'
import { LibSQLStore } from '@mastra/libsql'

export const llm = new Agent({
  id: 'llm',
  name: 'llm',
  instructions: ``,
  description: "make strutured output",
  model,
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db', // path is relative to the .mastra/output directory
    }),
  }),
})
