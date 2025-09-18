import { sumNumbers } from "./index";
import { test, describe, expect } from "bun:test";

describe("s", () => {
  test("Test add 2 + 1.", () => {
    const result = sumNumbers(2, 1);
    expect(result).toBe(3);
  });
});
