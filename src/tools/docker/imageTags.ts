import { z } from "zod";
import dockerApi from "../../auth/dockerApi.js";

export const registerImageTagsTool = (server: any) => {
    server.registerTool(
        "docker_image_tags",
        {
          title: "Docker Image Tags",
          description: "List all tags for a Docker image",
          inputSchema: {
            imageName: z.string(),
            page: z.number().optional(),
            pageSize: z.number().optional(),
          },
        },
        async ({ imageName, page = 1, pageSize = 25 }) => {
          const url = `/repositories/${encodeURIComponent(
            imageName
          )}/tags?page=${page}&page_size=${pageSize}`;
          const response = await dockerApi.get(url);
          const tags = response.data?.results || [];
    
          return {
            content: tags.map((tag: any) => ({
              type: "text" as const,
              text: `Tag: ${tag.name}, Last Updated: ${tag.last_updated}`,
            })),
          };
        }
      );
    
};