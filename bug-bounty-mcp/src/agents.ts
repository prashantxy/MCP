import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function analyzeCode(code: string) {

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a security auditor. Find vulnerabilities in the code.
Return severity, issue and fix.`
      },
      {
        role: "user",
        content: code
      }
    ]
  });

  return response.choices[0].message.content;
}
