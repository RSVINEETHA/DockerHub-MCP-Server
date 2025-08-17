import { z } from "zod";
import dockerApi from "../../auth/dockerApi.js";

export const registerSearchImagesTool = (server: any) => {
    server.registerTool(
        "docker_search_images",
        {
          title: "Docker Hub Image Search",
          description: "Search Docker Hub images by keyword",
          inputSchema: {
            query: z.string(),
            page: z.number().optional(),
            pageSize: z.number().optional(),
          },
        },
        async ({ query, page, pageSize }) => {
          const url = `/search/repositories/?query=${encodeURIComponent(
            query
          )}&page=${page || 1}&page_size=${pageSize || 25}`;
          const response = await dockerApi.get(url);
          const repos = response.data?.results || [];
    
          return {
            content: repos.map((repo: any) => ({
              type: "text" as const,
              text: `Name: ${repo.repo_name}, Stars: ${repo.star_count}, Pulls: ${repo.pull_count}`,
            })),
          };
        }
      );
};
