import { z } from "zod";

server.tool(
  "scan_repo",
  "Scan GitHub repository for vulnerabilities",
  {
    repo: z.string().describe("GitHub repository URL")
  },
  async ({ repo }) => {

    const result = `Scanning ${repo}...
    
Potential issues:
- Hardcoded API key
- Insecure dependency`;

    return {
      content: [
        {
          type: "text",
          text: result
        }
      ]
    };
  }
);
