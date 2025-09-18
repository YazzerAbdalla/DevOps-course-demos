import { describe, expect, test } from "bun:test";
import { createClient } from "./client.service";

describe("Test for client creation", () => {
  test("Test client name validation", () => {
    const result = createClient({ name: "2", email: "" });

    expect(result.status).toBe(401);
  });

  test("Test client email validation", () => {
    const result = createClient({ name: "yasser", email: "yasser" });

    expect(result.status).toBe(401);
  });

  test("Test client creation", () => {
    const result = createClient({ name: "yasser", email: "yasser@yasser.com" });

    expect(result.status).toBe(201);
  });
});
