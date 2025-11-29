export interface SpreadsheetDataResponse {
  success: boolean;
  data?: string[][];
  range: string;
  rowCount: number;
}

export interface SpreadsheetMetadataResponse {
  success: boolean;
  metadata: {
    title?: string | null;
    locale?: string | null;
    timeZone?: string | null;
    sheets?: Array<{
      title?: string | null;
      sheetId?: number | null;
      index?: number | null;
      gridProperties?: {
        rowCount?: number | null;
        columnCount?: number | null;
        frozenRowCount?: number | null;
        frozenColumnCount?: number | null;
      } | null;
    }>;
  };
}

export interface SpreadsheetErrorResponse {
  error: string;
  message?: string;
}
