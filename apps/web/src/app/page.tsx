"use client";

import { useState } from "react";
import { HealthForm } from "@/components/health-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResponseData {
  tip: string;
}

export default function Home(): JSX.Element {
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (values: {
    age: number;
    lastPeriod: Date;
    sleep_total_mins_last_28_days: number;
    sleep_total_mins_yesterday: number;
    hrv_avg_last_28_days: number;
    hrv_yesterday: number;
    sleep_fragmentation_avg_last_28_days: number;
    sleep_fragmentation_yesterday: number;
    resting_hr_avg_last_28_days: number;
    resting_hr_yesterday: number;
  }): Promise<void> => {
    setError(null);

    try {
      const response = await fetch("/api/proba", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age: values.age,
          lastPeriod: values.lastPeriod.toISOString(),
          sleep_total_mins_last_28_days: values.sleep_total_mins_last_28_days,
          sleep_total_mins_yesterday: values.sleep_total_mins_yesterday,
          hrv_avg_last_28_days: values.hrv_avg_last_28_days,
          hrv_yesterday: values.hrv_yesterday,
          sleep_fragmentation_avg_last_28_days:
            values.sleep_fragmentation_avg_last_28_days,
          sleep_fragmentation_yesterday: values.sleep_fragmentation_yesterday,
          resting_hr_avg_last_28_days: values.resting_hr_avg_last_28_days,
          resting_hr_yesterday: values.resting_hr_yesterday,
        }),
      });

      const apiResponse = await response.json();

      if (!response.ok) {
        throw new Error(apiResponse.message || "Failed to submit form");
      }

      setResponseData(apiResponse.data);
      console.log("API Response:", apiResponse);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("Form submission error:", err);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold">Health Assessment</h1>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left side - Form */}
          <div>
            <HealthForm onSubmit={handleFormSubmit} />
            {error && (
              <div className="mt-4 rounded-lg border border-red-500 bg-red-50 p-4">
                <p className="text-sm text-red-600">Error: {error}</p>
              </div>
            )}
          </div>

          {/* Right side - Results */}
          <div>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Results</CardTitle>
              </CardHeader>
              <CardContent>
                {responseData ? (
                  <div className="space-y-4">
                    {Object.entries(responseData).map(([key, value]) => (
                      <div key={key} className="rounded-lg border p-4">
                        <h3 className="text-muted-foreground mb-2 text-sm font-medium capitalize">
                          {key.replace(/_/g, " ")}
                        </h3>
                        <p className="text-2xl font-semibold">
                          {String(value)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground flex items-center justify-center py-12 text-center">
                    <p>Submit the form to see your results here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
