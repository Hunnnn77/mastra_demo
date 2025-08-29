import { MCPServer } from "@mastra/mcp";
import { airFlightWorkflow } from './workflows/airflight-workflow';
import { llm } from './agents/structured-agent';

const server = new MCPServer({
  name: "my-mcp-server",
  version: "1.0.0",
  workflows: { airFlightWorkflow },
  agents: { llm },
  tools: {},
});

server.startStdio().catch((error) => {
  console.error("Error running MCP server:", error);
  process.exit(1);
});