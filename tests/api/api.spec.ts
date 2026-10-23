import { test, expect } from "@playwright/test";

test("login API returns a token and a well-formed user for valid credentials", async ({ request }) => {
  const response = await request.post("/api/login", {
    data: { email: "qa@example.com", password: "Passw0rd!" },
  });
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(typeof body.token).toBe("string");
  expect(body.token.length).toBeGreaterThan(0);
  expect(body.user).toMatchObject({ email: "qa@example.com" });
  expect(typeof body.user.email).toBe("string");
});

test("login API rejects invalid credentials", async ({ request }) => {
  const response = await request.post("/api/login", {
    data: { email: "bad@example.com", password: "wrong" },
  });
  expect(response.status()).toBe(401);
  expect((await response.json()).error).toBe("Invalid email or password");
});

test("login API rejects a missing credential payload", async ({ request }) => {
  const response = await request.post("/api/login", { data: {} });
  expect(response.status()).toBe(401);
  expect((await response.json()).error).toBe("Invalid email or password");
});

test("widgets API requires an auth token", async ({ request }) => {
  const response = await request.get("/api/widgets");
  expect(response.status()).toBe(401);
});

test("widgets API rejects an invalid auth token", async ({ request }) => {
  const response = await request.get("/api/widgets", {
    headers: { Authorization: "Bearer invalid-token" },
  });
  expect(response.status()).toBe(401);
});

test("widgets API returns a schema-valid array with a token", async ({ request }) => {
  const response = await request.get("/api/widgets", {
    headers: { Authorization: "Bearer demo-token-not-for-production" },
  });
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(Array.isArray(body.widgets)).toBe(true);
  expect(body.widgets).toHaveLength(2);
  for (const widget of body.widgets) {
    expect(typeof widget.id).toBe("number");
    expect(typeof widget.name).toBe("string");
    expect(typeof widget.value).toBe("number");
  }
  expect(body.widgets).toContainEqual({ id: 1, name: "Sales", value: 120 });
  expect(body.widgets).toContainEqual({ id: 2, name: "Users", value: 42 });
});

test("known user API returns the expected user schema", async ({ request }) => {
  const response = await request.get("/api/users/1");
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toMatchObject({ id: 1, name: "QA Demo", role: "tester" });
  expect(typeof body.id).toBe("number");
  expect(typeof body.name).toBe("string");
  expect(typeof body.role).toBe("string");
});

test("unknown user API returns 404", async ({ request }) => {
  const response = await request.get("/api/users/999");
  expect(response.status()).toBe(404);
  expect((await response.json()).error).toBe("User not found");
});
