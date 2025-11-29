import type {
   RuleData,
   HealthMetrics,
   RuleEvaluationResult,
} from "../types/sheets";
import { evaluateRules } from "./rule-evaluator";

export function matcher(
   csv: string[][],
   params: HealthMetrics
): RuleEvaluationResult[] {
   const [headers, ...rows] = csv;

   const rules: RuleData[] = rows.map((row) => {
      const obj: Record<string, string> = {};
      headers.forEach((header, index) => {
         obj[header] = row[index] || "";
      });
      return obj as RuleData;
   });

   const matchedRules = evaluateRules([rules[0]], params);

   // console.log("Matched rules:", matchedRules);

   return matchedRules;
}
