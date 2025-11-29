import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { GoogleSheetsService } from "./services/google-sheets";
import fs from "fs";
import path from "path";

const app = new Hono();

app.use("*", logger());
app.use(
  "*",
  cors({
    origin: ["http://localhost:3000"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/health", (c) => {
  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.post("/proba", async (c) => {
  const body = await c.req.json();

  return c.json({
    request: body,
    message: "test",
  });
});

app.get("/test", async (c) => {
  try {
    // Load service account credentials
    const credentialsPath = path.join(
      process.cwd(),
      "secrets",
      "annaapp-479710-435744a76c6f.json"
    );
    const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf-8"));

    // Initialize Google Sheets service
    const sheetsService = new GoogleSheetsService({
      spreadsheetId: "1D6zGarXeyf7HA0Rp2lblFy-nJWyaaMD3cFisbVWMhUE",
      credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      },
    });

    // Read first column, first row (A1)
    const result = await sheetsService.readRange("A1");

    return c.json({
      success: true,
      cell: "A1",
      value: result?.[0]?.[0] || null,
      rawData: result,
    });
  } catch (error) {
    console.error("Error reading from Google Sheets:", error);
    return c.json(
      {
        success: false,
        error: "Failed to read from Google Sheets",
        message: error instanceof Error ? error.message : String(error),
      },
      500
    );
  }
});

const port = 3001;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
