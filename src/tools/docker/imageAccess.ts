import { z } from "zod";
import dockerApi from "../../auth/dockerApi.js";

export const registerImageAccessTool = (server: any) => {
    server.registerTool(
        "docker_image_access",
        {
          title: "Docker Image Access",
          description: "Retrieve user or organization access and repository visibility",
          inputSchema: { imageName: z.string() },
        },
        async ({ imageName }) => {
          const url = `/repositories/${encodeURIComponent(imageName)}/`;
          const response = await dockerApi.get(url);
          const data = response.data;
    
          return {
            content: [
              { type: "text", text: `Namespace (User/Org): ${data?.namespace || "N/A"}` },
              { type: "text", text: `Repository Visibility: ${data?.is_private ? "Private" : "Public"}` },
              { type: "text", text: `Repository Owner: ${data?.user || "N/A"}` },
              { type: "text", text: `Repository Type: ${data?.repository_type || "N/A"}` },
            ],
          };
        }
      );
    
};