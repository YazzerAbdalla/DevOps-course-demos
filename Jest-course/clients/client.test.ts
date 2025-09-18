import { describe, expect, test } from "bun:test";
import { createClient, updateClientName } from "./client.service";
import { readClientsCsvFile } from "../utils/CRUDClientCsvFile";

describe("Test for client creation", () => {
  test("Test client name validation", async () => {
    const result = await createClient({ name: "2", email: "" });

    expect(result.status).toBe(401);
  });

  test("Test client email validation", async () => {
    const result = await createClient({ name: "yasser", email: "yasser" });

    expect(result.status).toBe(401);
  });

  test("Test client creation", async () => {
    const result = await createClient({
      name: "yasser",
      email: "yasser@yasser.com",
    });

    expect(result.status).toBe(201);
  });

  test("Test client is added to the csv file", async () => {
    const clientsFile = await readClientsCsvFile();
    expect(clientsFile.length).toBeGreaterThan(0);
  });
});

describe("Test for client name update", () => {
  test("Test is file exist", async () => {
    const result = await updateClientName("sdfdfdsf", "yasser");

    expect(result.status).toBe(401);
  });
  test("Test the Client id validation", async () => {
    const result = await updateClientName(
      "830c2b8f-3fdf-4443-a057-f214932c7f2",
      "n"
    );
    expect(result.status).toBe(401);
  });
  test("Test the client new name validation.", async () => {
    const result = await updateClientName(
      "830c2b8f-3fdf-4443-a057-f214932c7f22",
      "n"
    );
    expect(result.status).toBe(401);
  });
  test("Test the client name update.", async () => {
    const clientId = "830c2b8f-3fdf-4443-a057-f214932c7f22";
    const result = await updateClientName(clientId, "New name");
    const clients = await readClientsCsvFile();

    const client = clients.find((c) => c.id === clientId);
    if (!client) {
      return expect().fail();
    }
    expect(client).toBeObject();
    expect(client.name).toBe("New name");
  });
});
