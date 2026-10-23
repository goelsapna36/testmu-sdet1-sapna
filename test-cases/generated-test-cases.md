# AI-Assisted Test Cases — TestMu SDET-1

This catalogue separates behavior covered by executable tests from expected behavior that the local demo does not implement. Do not report an unimplemented requirement as a passing test.

## Login module
| ID | Scenario | Expected result | Current status |
|---|---|---|---|
| L01 | Valid email and password | Dashboard is visible and welcome message contains the account email | Automated |
| L02 | Invalid email/password | Login remains visible and a generic error is shown | Automated |
| L03 | Empty email | Browser required-field validation blocks form submission | Automated |
| L04 | Forgot password | Neutral response is displayed without confirming whether an account exists | Automated; no email delivery |
| L05 | Logout | Dashboard is hidden and login is shown | Automated |
| L06 | Session expiry | An expired session cannot continue accessing protected pages/APIs | Gap: real session expiry is not implemented |
| L07 | Brute-force lockout | Repeated failures are rate-limited or temporarily lock the account | Gap: lockout/rate limiting not implemented |

### Login module — initial problems and changes
- Initial locator for the Dashboard heading matched both the page title and section heading, producing a strict-mode locator error.
- Updated the locator to use the exact heading name so it targets the intended section.
- Added checks for required email validation and the forgot-password confirmation shown by the demo.
- Session expiry and brute-force lockout remain explicit gaps because the demo does not implement them.

## Dashboard module
| ID | Scenario | Expected result | Current status |
|---|---|---|---|
| D01 | Dashboard load | Dashboard heading and widgets are visible after login | Automated in login/dashboard tests |
| D02 | Data accuracy | Sales=120 and Users=42 match the expected demo data | Automated |
| D03 | Filter=Users | Users widget is visible and Sales is hidden | Automated |
| D04 | Filter=Sales / All | Selected widget is shown; All restores both widgets | Automated |
| D05 | Responsive layout | At 375px viewport, both widgets remain visible without horizontal overflow | Automated |
| D06 | Permission-based visibility | Widgets are restricted to users with the relevant role/permission | Gap: role/permission model not implemented |

### Dashboard module — initial problems and changes
- The demo dashboard is intentionally small and includes only Sales and Users widgets with a client-side filter.
- Expanded assertions to verify both data values, all filter states, and logout behavior.
- Added a mobile viewport check for horizontal overflow.
- Permission-based visibility is not claimed as tested because the demo has no roles or permission controls.

## REST API module
| ID | Scenario | Request | Expected result | Current status |
|---|---|---|---|---|
| A01 | Valid login | POST /api/login with demo credentials | 200; non-empty token and user email string | Automated |
| A02 | Invalid credentials | POST /api/login with wrong credentials | 401 and generic error | Automated |
| A03 | Missing credential payload | POST /api/login with empty JSON | 401 and generic error | Automated |
| A04 | Missing token | GET /api/widgets without Authorization | 401 | Automated |
| A05 | Invalid token | GET /api/widgets with an invalid bearer token | 401 | Automated |
| A06 | Widget schema/data | GET /api/widgets with demo token | 200; array of typed records and expected values | Automated |
| A07 | Known user | GET /api/users/1 | 200; id, name, role types and expected fields | Automated |
| A08 | Unknown user | GET /api/users/999 | 404 and User not found | Automated |
| A09 | Rate limiting | Repeated requests beyond configured threshold | 429 or documented rate-limit response | Gap: not implemented |
| A10 | Server error handling | Simulated unexpected server error | 5xx response handled predictably | Gap: no 5xx simulation route |
| A11 | CRUD coverage | Create/read/update/delete resource operations | Correct status codes and persisted changes | Gap: only login, widget read and user lookup are implemented |

### REST API module — initial problems and changes
- The first API tests only checked a basic token, one widget, and one unknown-user response.
- Added token rejection cases for missing and invalid tokens, plus checks of response field types and expected data.
- Added a known-user response case and missing-credential request case.
- Full CRUD, rate limiting, and deliberate 5xx behavior remain gaps and must not be reported as passing.
