# Prompt Log — TestMu AI SDET-1

This log distinguishes instructions that are sent by the code from prepared test-generation prompts. Do not claim prepared prompts were sent to the Gemini API unless you actually submit them and retain their outputs.

## Prompt 1 — Active Gemini Failure Explainer instructions

These instruction lines are sent by `utils/failure-explainer.ts` on each integration test run; the code then appends the serialized `FailureInput` JSON as evidence.

> You are a cautious senior QA engineer helping analyze an automated test failure.
> Use only the supplied evidence. Do not claim certainty when evidence is insufficient.
> Return these sections: Likely explanation, Evidence, Suggested next checks, Suggested fix.
> Never request secrets or include credentials in your response.
> Analyze this failure input:

The evidence object includes `testTitle`, `errorMessage`, and optional `url` and `pageText` fields. The exact runtime JSON is saved in `artifacts/ai-failure-explanation.md` after a successful call.

## Prompt 2 — Login test-case generation (prepared; not represented as a completed Gemini API call)

You are a senior QA engineer. Generate risk-based test cases for a demo login form. Cover valid credentials, invalid credentials, empty required fields, forgot-password behavior, session expiry, logout, and brute-force lockout. For each case return an ID, priority, preconditions, steps, expected result, and whether the current demo implements it. Do not invent application behavior. Clearly separate runnable behavior from requirements that are not implemented.

## Prompt 3 — Dashboard test-case generation (prepared; not represented as a completed Gemini API call)

You are a senior QA engineer. Generate Playwright TypeScript test cases for a demo dashboard with Sales and Users widgets, numeric values, a widget filter, and a logout button. Cover widget loading, data accuracy, filter states, responsive layout, and permission-based visibility. For each case return ID, priority, steps, expected result, and implementation status. Do not claim permission support unless roles and permissions actually exist.

## Prompt 4 — REST API test-case generation (prepared; not represented as a completed Gemini API call)

You are a senior API QA engineer. Generate test cases for POST /api/login, GET /api/widgets, and GET /api/users/{id}. Cover valid and invalid authentication, missing and invalid tokens, response schema validation, 4xx and 5xx handling, rate limiting, and CRUD expectations. Return ID, priority, request, expected status, and assertions. Do not invent endpoints. Clearly identify rate limiting, deliberate 5xx simulation, and CRUD operations as gaps if they are absent from the current demo.

## Record-keeping

When any prepared prompt is sent to a model, append the date, model/provider, exact submitted prompt, and output reference. Do not silently rewrite the prompt after execution.
