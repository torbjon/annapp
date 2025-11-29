import type {
  RuleData,
  HealthMetrics,
  RuleEvaluationResult,
} from "../types/sheets";

/**
 * Calculate z-score for a given value against its baseline
 */
function calculateZScore(
  currentValue: number,
  baselineAverage: number
): number {
  // For simplicity, using a standard deviation assumption
  // In production, you'd want to calculate actual std dev from historical data
  const assumedStdDev = baselineAverage * 0.15; // 15% of baseline as std dev

  if (assumedStdDev === 0) {
    return 0;
  }

  return (currentValue - baselineAverage) / assumedStdDev;
}

/**
 * Map Anna metric names to actual values from HealthMetrics
 */
function getMetricValue(
  metricName: string,
  metrics: HealthMetrics,
  featureType: string
): number | null {
  const metricMap: Record<string, () => number | null> = {
    sleep_total_mins_z: () => {
      if (featureType === "z_score_vs_baseline") {
        return calculateZScore(
          metrics.sleep_total_mins_yesterday,
          metrics.sleep_total_mins_last_28_days
        );
      }
      return metrics.sleep_total_mins_yesterday;
    },
    hrv_sdnn_z: () => {
      if (featureType === "z_score_vs_baseline") {
        return calculateZScore(
          metrics.hrv_yesterday,
          metrics.hrv_avg_last_28_days
        );
      }
      return metrics.hrv_yesterday;
    },
    resting_hr_z: () => {
      if (featureType === "z_score_vs_baseline") {
        return calculateZScore(
          metrics.resting_hr_yesterday,
          metrics.resting_hr_avg_last_28_days
        );
      }
      return metrics.resting_hr_yesterday;
    },
    sleep_fragmentation_index_z: () => {
      if (featureType === "z_score_vs_baseline") {
        return calculateZScore(
          metrics.sleep_fragmentation_yesterday,
          metrics.sleep_fragmentation_avg_last_28_days
        );
      }
      return metrics.sleep_fragmentation_yesterday;
    },
  };

  const getter = metricMap[metricName];
  return getter ? getter() : null;
}

/**
 * Parse threshold value, handling comma as decimal separator
 */
function parseThreshold(value: string): number | null {
  if (!value || value.trim() === "") {
    return null;
  }

  // Replace comma with dot for decimal parsing
  const normalized = value.replace(",", ".");
  const parsed = parseFloat(normalized);

  return isNaN(parsed) ? null : parsed;
}

/**
 * Evaluate a single signal against its threshold
 */
function evaluateSignal(
  metricName: string,
  comparator: string,
  thresholdLow: string,
  thresholdHigh: string,
  featureType: string,
  metrics: HealthMetrics
): boolean | null {
  if (!metricName || metricName.trim() === "") {
    return null;
  }

  const value = getMetricValue(metricName, metrics, featureType);

  if (value === null) {
    return null;
  }

  const low = parseThreshold(thresholdLow);
  const high = parseThreshold(thresholdHigh);

  switch (comparator.toLowerCase().trim()) {
    case "<=":
      return low !== null ? value <= low : null;

    case ">=":
      return low !== null ? value >= low : null;

    case "<":
      return low !== null ? value < low : null;

    case ">":
      return low !== null ? value > low : null;

    case "=":
    case "==":
      return low !== null ? value === low : null;

    case "between":
      return low !== null && high !== null
        ? value >= low && value <= high
        : null;

    default:
      console.warn(`Unknown comparator: ${comparator}`);
      return null;
  }
}

/**
 * Evaluate SIGNAL_LOGIC expression
 */
function evaluateSignalLogic(
  logic: string,
  sig1: boolean | null,
  sig2: boolean | null,
  sig3: boolean | null
): boolean {
  if (!logic || logic.trim() === "") {
    return false;
  }

  // Replace signal placeholders with actual values
  let expression = logic
    .replace(/SIG1/g, String(sig1 ?? false))
    .replace(/SIG2/g, String(sig2 ?? false))
    .replace(/SIG3/g, String(sig3 ?? false));

  // Evaluate the expression
  try {
    // Parse AND/OR logic
    expression = expression
      .replace(/\s+AND\s+/gi, " && ")
      .replace(/\s+OR\s+/gi, " || ");

    // Use Function constructor to safely evaluate boolean expression
    const result = new Function(`return ${expression}`)();
    return Boolean(result);
  } catch (error) {
    console.error(`Error evaluating logic "${logic}":`, error);
    return false;
  }
}

/**
 * Evaluate a single rule against health metrics
 */
export function evaluateRule(
  rule: RuleData,
  metrics: HealthMetrics
): RuleEvaluationResult {
  // Evaluate each signal
  const sig1 = evaluateSignal(
    rule.SIG1_ANNA_METRIC_NAME,
    rule.SIG1_COMPARATOR,
    rule.SIG1_THRESHOLD_LOW,
    rule.SIG1_THRESHOLD_HIGH,
    rule.SIG1_FEATURE_TYPE,
    metrics
  );

  const sig2 = evaluateSignal(
    rule.SIG2_ANNA_METRIC_NAME,
    rule.SIG2_COMPARATOR,
    rule.SIG2_THRESHOLD_LOW,
    rule.SIG2_THRESHOLD_HIGH,
    rule.SIG2_FEATURE_TYPE,
    metrics
  );

  const sig3 = evaluateSignal(
    rule.SIG3_ANNA_METRIC_NAME,
    rule.SIG3_COMPARATOR,
    rule.SIG3_THRESHOLD_LOW,
    rule.SIG3_THRESHOLD_HIGH,
    rule.SIG3_FEATURE_TYPE,
    metrics
  );

  // Evaluate the overall signal logic
  const matched = evaluateSignalLogic(rule.SIGNAL_LOGIC, sig1, sig2, sig3);

  const rez = {
    ruleId: rule.RULE_ID,
    matched,
    signals: { sig1, sig2, sig3 },
    tipText: matched ? rule.TIP_TEXT : undefined,
    whyText: matched ? rule.WHY_TEXT_TEMPLATE : undefined,
    category: matched ? rule.TIP_CATEGORY : undefined,
  };

  console.log(rez);

  return rez;
}

/**
 * Evaluate all rules and return matching ones sorted by priority
 */
export function evaluateRules(
  rules: RuleData[],
  metrics: HealthMetrics
): RuleEvaluationResult[] {
  const results = rules
    .map((rule) => evaluateRule(rule, metrics))
    .filter((result) => result.matched)
    .sort((a, b) => {
      // Sort by priority (lower number = higher priority)
      const ruleA = rules.find((r) => r.RULE_ID === a.ruleId);
      const ruleB = rules.find((r) => r.RULE_ID === b.ruleId);

      if (!ruleA || !ruleB) return 0;

      const priorityA = parseInt(ruleA.PRIORITY) || 999;
      const priorityB = parseInt(ruleB.PRIORITY) || 999;

      return priorityA - priorityB;
    });

  return results;
}
