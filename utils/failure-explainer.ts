
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

export async function explainFailure(
  input: FailureInput
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is missing. Add it to your local .env file."
    );
  }

  const model =
    process.env.GEMINI_MODEL || "gemini-3.8-flash";

  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model,
    contents: [
      "You are a cautious senior QA engineer helping analyze an automated test failure.",
      "Use only the supplied evidence. Do not claim certainty when evidence is insufficient.",
      "Return these sections: Likely explanation, Evidence, Suggested next checks, Suggested fix.",
      "Never request secrets or include credentials in your response.",
      "Analyze this failure input:",
      JSON.stringify(input),
    ].join("\n\n"),
  });

  const explanation =
    response.text || "The model returned no text.";

  const outputDir = path.resolve("test-results");
  fs.mkdirSync(outputDir, { recursive: true });

  const report = `# AI Failure Explainer Output

**Provider:** Google Gemini

**Model:** ${model}

**Input:**

\`\`\`json
${JSON.stringify(input, null, 2)}
\`\`\`

**LLM response:**

${explanation}
`;

  fs.writeFileSync(
    path.join(outputDir, "ai-failure-explanation.md"),
    report,
    "utf8"
  );

  return explanation;
}
