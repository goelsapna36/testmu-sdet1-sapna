# AI Usage Log

| AI tool | Purpose | Output | Verification / limitation |
|---|---|---|---|
| ChatGPT | Assisted planning, authoring, debugging, test coverage review, and documentation for the Playwright + TypeScript assessment. | Starter code, scenario catalogue, and test scripts/documentation. | Original local suite was reported as 10 passed before the additional coverage pack. Run the updated suite after applying this patch. |
| Google Gemini API | Called by `utils/failure-explainer.ts` to analyze a controlled test-failure evidence object. | Actual LLM response attached to a Playwright test and written locally to `test-results/ai-failure-explanation.md` and `artifacts/ai-failure-explanation.md`. | The author reported a successful integration test and 10 passing tests before expanded tests were added. Re-run to verify the final suite. Model access and quota can vary. |
| OpenAI API | Initially attempted for the Failure Explainer. | No successful response was obtained because the account returned a no-credit 429 error. | Replaced with Google Gemini; OpenAI is not the active provider. |

## Initial problems and changes

- A Dashboard heading locator originally matched more than one heading; changing to an exact heading locator fixed the strict-mode error.
- The OpenAI API returned a 429 no-credit response, so the implementation was switched to Google Gemini.
- The first Gemini model setting returned a 404 availability error for this account; after updating the local model setting, the author reported the integration test passed.
- The initial suite reported 10 passed. Additional login, dashboard, and API tests in this patch must be re-run before claiming their results.

## Security

Never commit `.env`, API keys, or real credentials. Review `artifacts/ai-failure-explanation.md` for sensitive data before committing it. The local demo credentials in the README are for this demo only.
