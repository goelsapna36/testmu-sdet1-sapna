# Raw AI Prompts

Assessment requirement: preserve prompts exactly as used. Add each prompt below at the time it is used. The initial prompt below is a proposed prompt for this project; it must be sent to the chosen LLM and adjusted only by adding subsequent prompts, not by rewriting this record after use.

## Prompt 1 — Login test generation (proposed; not yet sent to the API)

You are a senior QA engineer. Generate a compact but risk-based set of Playwright TypeScript test cases for a demo login form. Cover valid credentials, invalid credentials, empty required fields, forgot-password behavior, session/logout behavior, and brute-force lockout as a requirement to verify. For each case provide title, preconditions, steps, expected result, priority, and note any behavior that the demo app does not implement. Do not invent application behavior.

## Prompt 2 — Dashboard test generation (proposed; not yet sent to the API)

You are a senior QA engineer. Generate Playwright TypeScript test cases for a dashboard with Sales and Users widgets, a widget filter, and a logout button. Cover widget loading, data accuracy, filter behavior, responsive layout, and permission-based visibility. Separate implemented behavior from requirements that need additional implementation. Return concise test cases with expected results.

## Prompt 3 — REST API test generation (proposed; not yet sent to the API)

You are a senior API QA engineer. Generate API test cases for POST /api/login, GET /api/widgets, and GET /api/users/{id}. Cover valid and invalid authentication, CRUD limitations, 4xx and 5xx handling, rate limiting, and response schema validation. Do not claim unsupported endpoints exist; clearly mark rate limiting, 5xx simulation, and missing CRUD endpoints as gaps to implement or document. Return a table of test name, request, expected status, assertions, and priority.
