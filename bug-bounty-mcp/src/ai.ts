import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function analyzeCode(code: string) {

  const response = await client.chat.completions.create({

    model: "gpt-4o-mini",

    messages: [
      {
        role: "system",
        content: "You are a cybersecurity expert."
      },
      {
        role: "user",
        content: `Analyze this code for vulnerabilities:\n\n${code}`
      }
    ]

  });

  return response.choices[0].message.content;
}
