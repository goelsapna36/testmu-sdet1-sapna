
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";
import path from "node:path";

export type FailureInput = {
  testTitle: string;
  errorMessage: string;
  url?: string;
  pageText?: string;
};

export async function explainFailure(input: FailureInput): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is missing. Add it to your local .env file."
    );
  }

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model,
    contents: [
      "You are a cautious senior QA engineer helping triage an automated test failure.",
      "Use only the supplied evidence. Do not claim certainty when evidence is insufficient.",
      "Return sections: Likely explanation, Evidence, Suggested next checks, Suggested fix.",
      "Never request secrets or include credentials in your response.",
      "Analyze this failure input:",
      JSON.stringify(input),
    ].join("\n\n"),
  });

  const text = response.text || "The model returned no text.";

  const outputDir = path.resolve("test-results");
  fs.mkdirSync(outputDir, { recursive: true });

  fs.writeFileSync(
    path.join(outputDir, "ai-failure-explanation.md"),
    `# AI Failure Explainer Output

**Provider:** Google Gemini

**Model:** ${model}

**Input:**

\`\`\`json
${JSON.stringify(input, null, 2)}
\`\`\`

**LLM response:**

${text}
`,
    "utf8"
  );

  return text;
}
