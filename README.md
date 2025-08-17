# DockerHub MCP Server

**Model Context Protocol (MCP) server** that provides comprehensive integration with DockerHub, enabling AI assistants to search, analyze, and manage Docker images through standardized MCP tools.

---

## Features
- Integrates seamlessly with DockerHub
- Exposes DockerHub tools as MCP tools
- Compatible with any MCP client (e.g., Claude Desktop)
- Supports development and production environments

---

## Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/dockerhub-mcp-server.git
cd dockerhub-mcp-server

Install dependencies
npm install

Create a .env file in the project root
DOCKER_USERNAME=your_dockerhub_username
DOCKER_PAT=your_dockerhub_personal_access_token

Run the server
Development mode
node --loader ts-node/esm src/index.ts

Build and run in production mode
npm run build
node build/index.js


You should see:

MCP server running — waiting for client...

Usage

This server can be integrated with any MCP client such as Claude Desktop.
It exposes all DockerHub functionalities as MCP tools, which can be invoked via the MCP client interface.