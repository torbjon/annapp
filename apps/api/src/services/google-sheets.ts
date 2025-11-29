import { google } from "googleapis";
import { sheets_v4 } from "googleapis";

export interface GoogleSheetsConfig {
  spreadsheetId: string;
  credentials?: {
    client_email: string;
    private_key: string;
  };
}

export class GoogleSheetsService {
  private sheets: sheets_v4.Sheets;
  private spreadsheetId: string;

  constructor(config: GoogleSheetsConfig) {
    this.spreadsheetId = config.spreadsheetId;

    const auth = new google.auth.GoogleAuth({
      credentials: config.credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    this.sheets = google.sheets({ version: "v4", auth });
  }

  async readRange(range: string): Promise<string[][] | undefined> {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range,
      });

      return response.data.values;
    } catch (error) {
      console.error("Error reading spreadsheet:", error);
      throw error;
    }
  }

  async readMultipleRanges(
    ranges: string[]
  ): Promise<sheets_v4.Schema$ValueRange[] | undefined> {
    try {
      const response = await this.sheets.spreadsheets.values.batchGet({
        spreadsheetId: this.spreadsheetId,
        ranges,
      });

      return response.data.valueRanges;
    } catch (error) {
      console.error("Error reading multiple ranges:", error);
      throw error;
    }
  }

  async getSpreadsheetMetadata(): Promise<sheets_v4.Schema$Spreadsheet> {
    try {
      const response = await this.sheets.spreadsheets.get({
        spreadsheetId: this.spreadsheetId,
      });

      return response.data;
    } catch (error) {
      console.error("Error getting spreadsheet metadata:", error);
      throw error;
    }
  }
}
