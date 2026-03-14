import { z } from "zod";

export const tools = [
  {
    name: "scan_repo",
    description: "Scan GitHub repository for vulnerabilities",
    schema: {
      repo: z.string()
    },

    execute: async ({ repo }: { repo: string }) => {

      const result = `
Scanning ${repo}

Potential Issues:
- Hardcoded API keys
- Vulnerable dependencies
`;

      return {
        content: [
          {
            type: "text",
            text: result
          }
        ]
      };
    }
  }
];
