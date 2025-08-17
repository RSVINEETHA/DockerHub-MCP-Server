// src/index.ts

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerSearchImagesTool } from "./tools/docker/searchImages.js";
import { registerImagesDetailsTool } from "./tools/docker/imageDetails.js";
import { registerImageDockerFileTool } from "./tools/docker/imageDockerfile.js";
import { registerImageTagsTool } from "./tools/docker/imageTags.js";
import { registerImageLayersTool } from "./tools/docker/imageLayers.js";
import { registerImageStatsTool } from "./tools/docker/imageStats.js";
import { registerImageAccessTool } from "./tools/docker/imageAccess.js";
import {registerImageHistoryTool} from "./tools/docker/imageHistory.js";
/**
 * DockerHub MCP Server
 */
async function main() {
  const server = new McpServer({
    name: "dockerhub-mcp-server",
    version: "1.0.0",
  });

  registerSearchImagesTool(server);
  registerImagesDetailsTool(server);
  registerImageTagsTool(server);
  registerImageLayersTool(server);
  registerImageDockerFileTool(server);
  registerImageStatsTool(server);
  registerImageAccessTool(server);
  registerImageHistoryTool(server);

  // Start stdio transport
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error("MCP server running — waiting for client...");
}

main().catch((err) => {
  console.error("Fatal error starting MCP server:", err);
  process.exit(1);
});
