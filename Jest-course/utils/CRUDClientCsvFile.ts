import type { Client } from "../clients/client.service";

const filePath = "./public/clients.csv";

export async function isClientsCsvFileExist() {
  const clients = Bun.file(filePath);
  return await clients.exists();
}

export async function createUpdateClientsCsvFile(data: Client[]) {
  try {
    if (!data || data === undefined || data.length === 0) {
      throw new Error("Clients data is not defined or empty.");
    }

    // Extract headers from Client object keys
    const headers = Object.keys(data[0] as Client);

    // Build CSV rows
    const rows = data.map((obj) =>
      headers.map((h) => obj[h as keyof Client]).join(",")
    );

    // Add headers as the first line
    const csvString = [headers.join(","), ...rows].join("\n");

    // Write CSV file with Bun
    await Bun.write(filePath, csvString);

    console.log("✅ Clients CSV file created/updated:", filePath);
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function readClientsCsvFile(): Promise<Client[]> {
  try {
    const file = Bun.file(filePath);

    // Check if file exists
    if (!(await file.exists())) {
      console.log("⚠️ Clients CSV file not found:", filePath);
      return [];
    }

    // Read file content as string
    const content = await file.text();

    // Split by line breaks
    const lines = content.trim().split("\n");

    if (lines.length <= 0 || lines[0] === undefined) {
      return [];
    }

    // Extract headers (first line)
    const headers = lines[0].split(",");

    // Convert each remaining line into a Client object
    const clients = lines.slice(1).map((line) => {
      const values = line.split(",");

      // Build object dynamically
      const obj: any = {};
      headers.forEach((h, i) => {
        obj[h] = values[i] ?? "";
      });

      return obj as Client;
    });

    return clients;
  } catch (err: any) {
    throw new Error("Error reading clients CSV: " + err.message);
  }
}
