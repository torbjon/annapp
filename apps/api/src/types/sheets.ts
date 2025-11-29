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

export interface RuleData {
  RULE_ID: string;
  DOMAIN: string;
  SYMPTOM_CLUSTER: string;
  RULE_NAME_SHORT: string;
  STATUS: string;
  PRIORITY: string;
  SIG1_ANNA_METRIC_NAME: string;
  SIG1_APPLE_SOURCE: string;
  SIG1_BASELINE_WINDOW_DAYS: string;
  SIG1_FEATURE_TYPE: string;
  SIG1_COMPARATOR: string;
  SIG1_THRESHOLD_LOW: string;
  SIG1_THRESHOLD_HIGH: string;
  SIG1_REQUIRED: string;
  SIG2_ANNA_METRIC_NAME: string;
  SIG2_APPLE_SOURCE: string;
  SIG2_BASELINE_WINDOW_DAYS: string;
  SIG2_FEATURE_TYPE: string;
  SIG2_COMPARATOR: string;
  SIG2_THRESHOLD_LOW: string;
  SIG2_THRESHOLD_HIGH: string;
  SIG2_REQUIRED: string;
  SIG3_ANNA_METRIC_NAME: string;
  SIG3_APPLE_SOURCE: string;
  SIG3_BASELINE_WINDOW_DAYS: string;
  SIG3_FEATURE_TYPE: string;
  SIG3_COMPARATOR: string;
  SIG3_THRESHOLD_LOW: string;
  SIG3_THRESHOLD_HIGH: string;
  SIG3_REQUIRED: string;
  SIGNAL_LOGIC: string;
  JOURNAL_CONDITION: string;
  PROFILE_INCLUDE: string;
  PROFILE_EXCLUDE: string;
  CONFOUNDERS_UNLESS: string;
  DATA_CONFIDENCE_MIN: string;
  TIP_TEXT: string;
  TIP_CATEGORY: string;
  WHY_TEXT_TEMPLATE: string;
  SAFE_FOR_PROFILE_NOTES: string;
  EVIDENCE_LEVEL: string;
  EVIDENCE_SOURCE_SHORT: string;
  EVIDENCE_NOTES: string;
  FEEDBACK_MEASURE: string;
  EXPECTED_DIRECTION: string;
  COOLDOWN_DAYS_AFTER_USE: string;
  AUTHOR: string;
  CLINICAL_REVIEWER: string;
  DATE_CREATED: string;
  DATE_LAST_UPDATED: string;
  VERSION_NOTES: string;
}

export interface HealthMetrics {
  age: number;
  lastPeriod: string;
  sleep_total_mins_last_28_days: number;
  sleep_total_mins_yesterday: number;
  hrv_avg_last_28_days: number;
  hrv_yesterday: number;
  sleep_fragmentation_avg_last_28_days: number;
  sleep_fragmentation_yesterday: number;
  resting_hr_avg_last_28_days: number;
  resting_hr_yesterday: number;
}

export interface RuleEvaluationResult {
  ruleId: string;
  matched: boolean;
  signals: {
    sig1: boolean | null;
    sig2: boolean | null;
    sig3: boolean | null;
  };
  tipText?: string;
  whyText?: string;
  category?: string;
}
