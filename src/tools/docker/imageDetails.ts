import { z } from "zod";
import dockerApi from "../../auth/dockerApi.js";

export const registerImagesDetailsTool = (server: any) => {
    server.registerTool(
        "docker_image_details",
        {
          title: "Docker Image Details",
          description: "Retrieve metadata for a Docker image",
          inputSchema: { imageName: z.string() },
        },
        async ({ imageName }) => {
          const url = `/repositories/${encodeURIComponent(imageName)}/`;
          const response = await dockerApi.get(url);
          const data = response.data;
    
          return {
            content: [
              { type: "text", text: `Name: ${data?.name || "N/A"}` },
              { type: "text", text: `Namespace: ${data?.namespace || "N/A"}` },
              { type: "text", text: `Description: ${data?.description || "N/A"}` },
              { type: "text", text: `Star Count: ${data?.star_count ?? "N/A"}` },
              { type: "text", text: `Pull Count: ${data?.pull_count ?? "N/A"}` },
              { type: "text", text: `Last Updated: ${data?.last_updated || "N/A"}` },
            ],
          };
        }
      );
};