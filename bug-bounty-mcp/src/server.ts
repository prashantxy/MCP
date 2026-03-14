import { Implementation } from "@modelcontextprotocol/sdk/types.js";
import { McpHonoServerDO } from "@nullshot/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { setupServerTools } from "./tools";
import { setupServerResources } from "./resources";
import { setupServerPrompts } from "./prompts";

export class ExampleMcpServer extends McpHonoServerDO<Env> {

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
  }

  // MCP server identity
  getImplementation(): Implementation {
    return {
      name: "ExampleMcpServer",
      version: "1.0.0",
    };
  }

  // Register all tools/resources/prompts
  configureServer(server: McpServer): void {

    setupServerTools(server);
    setupServerResources(server);
    setupServerPrompts(server);

  }

}
