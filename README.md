# TestMu AI SDET-1 — Playwright + Gemini

## Overview

A local demo QA automation project using Playwright,
TypeScript, REST API tests, and Google Gemini for
AI-assisted failure explanation.

## Requirements

- Node.js
- npm
- Google Gemini API key with available model access and quota

## Setup

1. Install dependencies:

   npm install

2. Install Chromium:

   npx playwright install chromium

3. Copy .env.example to .env.

4. Add your Gemini API key to .env:

   GEMINI_API_KEY=your_key_here
   GEMINI_MODEL=gemini-3.8-flash

Never commit your .env file.

## Run all tests

   npm test

## Run TypeScript check

   npm run typecheck

## Run Gemini integration test

   npx playwright test tests/login/login.spec.ts --grep "failure explainer integration"

## Demo credentials

Email: qa@example.com
Password: Passw0rd!

These credentials are only for the local demo application.

## Implemented

- Login success and invalid-login tests
- Dashboard widget filter and logout tests
- REST API authentication and basic response tests
- Real Gemini API integration for failure explanation
- LLM response attached to a Playwright test result

## Known limitations

- Forgot-password flow and brute-force lockout are not implemented.
- Session expiry and permission-based dashboard tests need expansion.
- Full CRUD, rate limiting, schema validation coverage,
  and deliberate 5xx simulation remain incomplete.
- The AI integration currently analyzes controlled failure
  evidence; it does not automatically explain every failed test.

## Assessment artifacts
- `prompts.md`: prompts to record exactly as sent to the LLM. Proposed prompts are labelled as not yet sent; update honestly as you run them.
- `test-cases/`: place saved generated cases here.
- `ai-usage-log.md`: record AI tools and verification status.
- `utils/failure-explainer.ts`: actual OpenAI API integration code.

## What I'd build next
1. Automatically trigger the Failure Explainer from a Playwright reporter after real failures.
2. Add authorization roles and tests for permission-based dashboard visibility.
3. Implement rate limiting and schema validation for the REST API.
4. Add retry-safe LLM output validation, secret redaction, and CI secrets configuration.
5. Add more negative tests and attach trace/screenshot evidence to reports.
