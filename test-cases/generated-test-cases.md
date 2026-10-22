# Generated Test Cases — Initial Draft

These are an initial human-reviewed draft, not a claim that an LLM has already generated or validated them. Record actual LLM prompts and responses in `prompts.md` and this file during execution.

## Login
1. Valid credentials: submit `qa@example.com` / `Passw0rd!`; expect Dashboard visible.
2. Invalid credentials: submit incorrect password; expect 401-backed error message.
3. Empty email/password: required-field validation should block submission.
4. Forgot password: expect a neutral confirmation message; actual email delivery is not implemented.
5. Logout/session: logout should return to Login. Real session expiry is not implemented.
6. Brute-force lockout: repeated failures should eventually be rate-limited/locked. Not implemented; mark as a gap, not a passing test.

## Dashboard
1. Dashboard widgets load after valid login.
2. Sales widget displays expected value 120.
3. Users widget displays expected value 42.
4. Filter=Users hides Sales and shows Users.
5. Responsive layout should remain usable at mobile width; add viewport assertions.
6. Permission-based visibility requires roles/permissions in the app; not implemented.

## REST API
1. Valid login returns 200 and token.
2. Invalid login returns 401.
3. Widgets endpoint without token returns 401.
4. Widgets endpoint with valid demo token returns 200 and an array.
5. Unknown user returns 404.
6. Schema validation should assert types and required fields.
7. Rate limiting is not implemented.
8. 5xx simulation is not implemented.
9. Full CRUD is not implemented; current API supports login, widgets read, and user lookup only.
