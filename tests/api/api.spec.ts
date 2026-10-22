import { test, expect } from "@playwright/test";

test("login API returns a token for valid credentials", async ({ request }) => {
  const response = await request.post("/api/login", {
    data: { email: "qa@example.com", password: "Passw0rd!" }
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.token).toBeTruthy();
  expect(body.user.email).toBe("qa@example.com");
});

test("login API rejects invalid credentials", async ({ request }) => {
  const response = await request.post("/api/login", {
    data: { email: "bad@example.com", password: "wrong" }
  });
  expect(response.status()).toBe(401);
  expect((await response.json()).error).toBe("Invalid email or password");
});

test("widgets API requires an auth token", async ({ request }) => {
  const response = await request.get("/api/widgets");
  expect(response.status()).toBe(401);
});

test("widgets API returns a valid widget array with a token", async ({ request }) => {
  const response = await request.get("/api/widgets", {
    headers: { Authorization: "Bearer demo-token-not-for-production" }
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(Array.isArray(body.widgets)).toBeTruthy();
  expect(body.widgets[0]).toMatchObject({ id: 1, name: "Sales", value: 120 });
});

test("unknown user API returns 404", async ({ request }) => {
  const response = await request.get("/api/users/999");
  expect(response.status()).toBe(404);
});
