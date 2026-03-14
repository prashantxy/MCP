import { z } from "zod";
import { fetchRepoFiles } from "./github";
import { detectSecrets } from "./scanner";
import { analyzeCode } from "./ai";

export const tools = [

{
name: "scan_repo",
description: "Scan GitHub repository",

schema: {
repo: z.string()
},

execute: async ({ repo }: { repo: string }) => {

const files = await fetchRepoFiles(repo);

return {
content: [{
type: "text",
text: `Fetched ${files.length} files from ${repo}`
}]
};

}

},

{
name: "detect_secrets",
description: "Detect API keys in code",

schema: {
code: z.string()
},

execute: async ({ code }: { code: string }) => {

const secrets = detectSecrets(code);

return {
content: [{
type: "text",
text: `Secrets found: ${JSON.stringify(secrets)}`
}]
};

}

},

{
name: "ai_security_analysis",
description: "AI vulnerability analysis",

schema: {
code: z.string()
},

execute: async ({ code }: { code: string }) => {

const result = await analyzeCode(code);

return {
content: [{
type: "text",
text: result
}]
};

}

}

];
