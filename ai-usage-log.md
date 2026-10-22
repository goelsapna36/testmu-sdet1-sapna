# AI Usage Log

| AI Tool | Purpose | Output | Verification |
|---|---|---|---|
| ChatGPT | Project planning, code guidance, debugging and documentation support. | Playwright + TypeScript starter project and troubleshooting guidance. | Local test suite reported 10 passed. |
| Google Gemini API | Analyzed controlled test-failure evidence through the Failure Explainer. | Actual LLM response attached to a Playwright test and saved locally in test-results/ai-failure-explanation.md. | Integration test passed locally; full suite reported 10 passed. |
| OpenAI API | Initially attempted for the Failure Explainer. | No successful response obtained because the account had $0.00 API credit. | Replaced with Google Gemini. |

## Notes

- The active LLM provider is Google Gemini.
- The author reported 10 passing Playwright tests in the local environment.
- API availability and quotas can vary.
- The local .env file and API keys must never be committed.