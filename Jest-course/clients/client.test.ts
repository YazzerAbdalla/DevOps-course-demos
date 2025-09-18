import { describe, expect, test } from "bun:test";
import { createClient } from "./client.service";

describe("Test for client creation", () => {
  test("Test client name validation", () => {
    const result = createClient({ name: "2", email: "" });

    expect(result.status);
  });
});
