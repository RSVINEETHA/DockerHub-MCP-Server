import { z } from "zod";
import dockerApi from "../../auth/dockerApi.js";

export const registerImageLayersTool = (server: any) => {
    server.registerTool(
        "docker_image_layers",
        {
          title: "Docker Image Layers",
          description: "Retrieve layer info for a Docker image tag",
          inputSchema: { imageName: z.string(), tag: z.string() },
        },
        async ({ imageName, tag }) => {
          const url = `/repositories/${encodeURIComponent(
            imageName
          )}/tags/${encodeURIComponent(tag)}/images`;
          const response = await dockerApi.get(url);
          const layers = Array.isArray(response.data)
            ? response.data
            : response.data?.results || [];
    
          return {
            content: layers.map((layer: any, idx: number) => ({
              type: "text" as const,
              text: `Layer ${idx + 1}: Digest: ${layer.digest}, Size: ${
                layer.size || "N/A"
              } bytes`,
            })),
          };
        }
      );
};