# TestMu AI SDET-1 — AI-Assisted QA Starter

This repository is a small local demonstration for the TestMu AI SDET-1 assessment. It uses Playwright + TypeScript to test a local Login/Dashboard web app and REST API, and includes an OpenAI-powered Failure Explainer.

## Requirements
- Node.js 20+ recommended
- npm
- OpenAI API key with API access and quota (only needed for the real LLM test)

## Setup
```bash
npm install
npx playwright install chromium
cp .env.example .env
```
Edit `.env` locally and set `OPENAI_API_KEY`. Never commit `.env`.

## Run the tests
```bash
npm test
```
Playwright starts the local app automatically at `http://127.0.0.1:4173`. The HTML report is generated under `playwright-report/`.

To see the browser:
```bash
npm run test:headed
```

To open the report:
```bash
npm run test:report
```

To run only the real OpenAI integration test, use:
```bash
npx playwright test tests/login/login.spec.ts -g "failure explainer"
```
Without `OPENAI_API_KEY`, the integration test is skipped rather than faking an LLM response. With a valid key and quota, it calls the OpenAI Responses API, attaches the response to the test, and writes `test-results/ai-failure-explanation.md`.

## Demo credentials
- Email: `qa@example.com`
- Password: `Passw0rd!`

These credentials are for this local demo only. The app is not production authentication and must not be exposed publicly.

## Scope and honest limitations
- Implemented: UI login success/failure, dashboard widgets/filter/logout, login API, authenticated widgets API, and a single-user lookup endpoint.
- Not implemented: real password reset delivery, account lockout/brute-force protection, dashboard role permissions, full CRUD, rate limiting, and deliberate 5xx simulation. These are documented assessment gaps, not passing tests.
- The Failure Explainer sends a controlled failure-evidence example to the real OpenAI API. It does not automatically explain every failed test yet; production hardening would add a reporter hook that safely collects real failure context, redacts secrets, retries safely, and handles API errors.
- API key is required for the real LLM call. API billing/quota is separate from ChatGPT subscription access.

## Assessment artifacts
- `prompts.md`: prompts to record exactly as sent to the LLM. Proposed prompts are labelled as not yet sent; update honestly as you run them.
- `test-cases/`: place saved generated cases here.
- `ai-usage-log.md`: record AI tools and verification status.
- `utils/failure-explainer.ts`: actual gemini API integration code.

## What I'd build next
1. Automatically trigger the Failure Explainer from a Playwright reporter after real failures.
2. Add authorization roles and tests for permission-based dashboard visibility.
3. Implement rate limiting and schema validation for the REST API.
4. Add retry-safe LLM output validation, secret redaction, and CI secrets configuration.
5. Add more negative tests and attach trace/screenshot evidence to reports.
