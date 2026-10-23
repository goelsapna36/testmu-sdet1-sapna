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

  // Prefer the model configured in .env. The fallback matches the model
  // that passed in the author's local integration test; availability can vary.
  const model = process.env.GEMINI_MODEL || "gemini-3.8-flash";
  const ai = new GoogleGenAI({ apiKey });

  const instructions = [
    "You are a cautious senior QA engineer helping analyze an automated test failure.",
    "Use only the supplied evidence. Do not claim certainty when evidence is insufficient.",
    "Return these sections: Likely explanation, Evidence, Suggested next checks, Suggested fix.",
    "Never request secrets or include credentials in your response.",
    "Analyze this failure input:",
    JSON.stringify(input),
  ].join("\n\n");

  const response = await ai.models.generateContent({
    model,
    contents: instructions,
  });

  const explanation = response.text || "The model returned no text.";
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

  // Keep the normal Playwright output, and also save a reviewable sample
  // artifact that can be committed with the assessment after the test runs.
  const testResultsDir = path.resolve("test-results");
  const artifactDir = path.resolve("artifacts");
  fs.mkdirSync(testResultsDir, { recursive: true });
  fs.mkdirSync(artifactDir, { recursive: true });

  fs.writeFileSync(
    path.join(testResultsDir, "ai-failure-explanation.md"),
    report,
    "utf8"
  );
  fs.writeFileSync(
    path.join(artifactDir, "ai-failure-explanation.md"),
    report,
    "utf8"
  );

  return explanation;
}
