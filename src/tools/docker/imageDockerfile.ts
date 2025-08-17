import { z } from "zod";
import dockerApi from "../../auth/dockerApi.js";

export const registerImageDockerFileTool = (server: any) => {
    server.registerTool(
        "docker_image_dockerfile",
        {
          title: "Dockerfile Retrieval",
          description: "Retrieve Dockerfile for a Docker image",
          inputSchema: { imageName: z.string(), tag: z.string() },
        },
        async ({ imageName }) => {
          try {
            const url = `/repositories/${encodeURIComponent(imageName)}/dockerfile/`;
            const response = await dockerApi.get(url, { responseType: "text" });
            return {
              content: [{ type: "text", text: response.data || "Dockerfile not available." }],
            };
          } catch {
            return {
              content: [{ type: "text", text: "Dockerfile not available." }],
            };
          }
        }
      );
};