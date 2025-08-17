import { z } from "zod";
import dockerApi from "../../auth/dockerApi.js";

export const registerImageStatsTool = (server: any) => {
    server.registerTool(
        "docker_image_stats",
        {
          title: "Docker Image Stats",
          description:
            "Retrieve download statistics and popularity metrics for a Docker image",
          inputSchema: { imageName: z.string() },
        },
        async ({ imageName }) => {
          const url = `/repositories/${encodeURIComponent(imageName)}/`;
          const response = await dockerApi.get(url);
          const data = response.data;
    
          return {
            content: [
              { type: "text", text: `Image: ${data?.name || "N/A"}` },
              { type: "text", text: `Namespace: ${data?.namespace || "N/A"}` },
              { type: "text", text: `Star Count: ${data?.star_count ?? "N/A"}` },
              { type: "text", text: `Pull Count: ${data?.pull_count ?? "N/A"}` },
              { type: "text", text: `Is Official: ${data?.is_official}` },
              { type: "text", text: `Is Automated: ${data?.is_automated}` },
              { type: "text", text: `Last Updated: ${data?.last_updated || "N/A"}` },
            ],
          };
        }
      );
};