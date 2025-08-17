import { z } from "zod";
import dockerApi from "../../auth/dockerApi.js";

export const registerImageHistoryTool = (server: any) => {
    server.registerTool(
        "docker_image_history",
        {
          title: "Docker Image History",
          description: "Get creation and history details for a Docker image tag",
          inputSchema: { imageName: z.string(), tag: z.string() },
        },
        async ({ imageName, tag }) => {
          const url = `/repositories/${encodeURIComponent(
            imageName
          )}/tags/${encodeURIComponent(tag)}/images`;
          const response = await dockerApi.get(url);
          const history = Array.isArray(response.data)
            ? response.data
            : response.data?.results || [];
    
          return {
            content: history.map((layer: any, idx: number) => ({
              type: "text" as const,
              text: `Layer ${idx + 1}: Created: ${layer.created || "N/A"}, Digest: ${
                layer.digest || "N/A"
              }, Size: ${layer.size || "N/A"}`,
            })),
          };
        }
      );
};