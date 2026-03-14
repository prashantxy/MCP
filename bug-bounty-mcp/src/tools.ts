import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import { fetchRepoFiles } from "./github";
import { detectSecrets } from "./scanner";
import { analyzeCode } from "./ai";

export function setupServerTools(server: McpServer) {

  server.tool(
    "test_scanner",
    "Test the secret scanner with a sample API key",
    {},
    async () => {

      const result = detectSecrets(`
        const API_KEY = "sk_live_123456";
      `);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result)
          }
        ]
      };

    }
  );



  // -------------------------------
  // Scan GitHub Repo
  // -------------------------------

  server.tool(
    "scan_repo",
    "Scan a GitHub repository and return file list",
    {
      repo: z.string()
    },
    async ({ repo }) => {

      const files = await fetchRepoFiles(repo);

      return {
        content: [
          {
            type: "text",
            text: `Fetched ${files.length} files from ${repo}`
          }
        ]
      };

    }
  );



  // -------------------------------
  // Secret Detection
  // -------------------------------

  server.tool(
    "detect_secrets",
    "Detect secrets in provided code",
    {
      code: z.string()
    },
    async ({ code }) => {

      const secrets = detectSecrets(code);

      return {
        content: [
          {
            type: "text",
            text: `Secrets detected: ${JSON.stringify(secrets)}`
          }
        ]
      };

    }
  );



  // -------------------------------
  // AI Vulnerability Analysis
  // -------------------------------

  server.tool(
    "ai_security_analysis",
    "Analyze code for vulnerabilities using AI",
    {
      code: z.string()
    },
    async ({ code }) => {

      const result = await analyzeCode(code);

      return {
        content: [
          {
            type: "text",
            text: result ?? "No vulnerabilities detected"
          }
        ]
      };

    }
  );

}
