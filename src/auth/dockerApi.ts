import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
import axios from "axios";

const DOCKER_USERNAME = process.env.DOCKER_USERNAME!;
const DOCKER_PAT = process.env.DOCKER_PAT!; // Personal Access Token

if (!DOCKER_USERNAME || !DOCKER_PAT) {
  throw new Error("Missing DOCKER_USERNAME or DOCKER_PAT in environment variables");
}

const dockerApi = axios.create({
  baseURL: "https://hub.docker.com/v2/",
  auth: {
    username: DOCKER_USERNAME,
    password: DOCKER_PAT, // Use PAT directly for Basic Auth
  },
});

// Handle rate limits
dockerApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 429) {
      const retryAfter = parseInt(error.response.headers["retry-after"] || "5", 10);
      console.log(`Rate limit hit. Retrying after ${retryAfter} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
      return dockerApi(error.config);
    }
    return Promise.reject(error);
  }
);

export default dockerApi;
