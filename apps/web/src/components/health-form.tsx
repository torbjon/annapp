"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useMemo } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  age: z
    .number()
    .min(1, "Age is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Age must be a positive number",
    })
    .refine((val) => Number(val) <= 120, {
      message: "Age must be 120 or less",
    }),
  lastPeriod: z.date({
    required_error: "Please select the date of your last period",
  }),
  sleep_total_mins_last_28_days: z
    .number()
    .min(1, "Sleep total for last 28 days is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Sleep total must be a non-negative number",
    }),
  sleep_total_mins_yesterday: z
    .number()
    .min(1, "Sleep total for yesterday is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Sleep total must be a non-negative number",
    })
    .refine((val) => Number(val) <= 1440, {
      message: "Sleep total cannot exceed 1440 minutes (24 hours)",
    }),
  hrv_avg_last_28_days: z
    .number()
    .min(1, "HRV average for last 28 days is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "HRV average must be a non-negative number",
    }),
  hrv_yesterday: z
    .number()
    .min(1, "HRV for yesterday is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "HRV must be a non-negative number",
    }),
  sleep_fragmentation_avg_last_28_days: z
    .number()
    .min(1, "Sleep fragmentation average for last 28 days is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Sleep fragmentation must be a non-negative number",
    }),
  sleep_fragmentation_yesterday: z
    .number()
    .min(1, "Sleep fragmentation for yesterday is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Sleep fragmentation must be a non-negative number",
    }),
  resting_hr_avg_last_28_days: z
    .number()
    .min(1, "Resting heart rate average for last 28 days is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Resting heart rate must be a non-negative number",
    }),
  resting_hr_yesterday: z
    .number()
    .min(1, "Resting heart rate for yesterday is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Resting heart rate must be a non-negative number",
    }),
});

type FormValues = z.infer<typeof formSchema>;

interface HealthFormProps {
  onSubmit: (values: FormValues) => Promise<void>;
}

export function HealthForm({ onSubmit }: HealthFormProps) {
  const defaultLastPeriod = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() - 10);
    return date;
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 40,
      lastPeriod: defaultLastPeriod,
      sleep_total_mins_last_28_days: 500,
      sleep_total_mins_yesterday: 400,
      hrv_avg_last_28_days: 50,
      hrv_yesterday: 55,
      sleep_fragmentation_avg_last_28_days: 10,
      sleep_fragmentation_yesterday: 12,
      resting_hr_avg_last_28_days: 60,
      resting_hr_yesterday: 65,
    },
  });

  async function handleSubmit(values: FormValues): Promise<void> {
    console.log(values);
    await onSubmit(values);
  }

  return (
    <Card className="w-full">
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your age"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastPeriod"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Last Period</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sleep_total_mins_last_28_days"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Sleep - Last 28 Days (minutes)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter total sleep in minutes"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sleep_total_mins_yesterday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Sleep - Yesterday (minutes)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter yesterday's sleep in minutes"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="hrv_avg_last_28_days"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>HRV AVG - Last 28 Days (ms)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter average HRV"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hrv_yesterday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>HRV - Yesterday (ms)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter yesterday's HRV"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sleep_fragmentation_avg_last_28_days"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Sleep Fragmentation AVG - Last 28 Days
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter average sleep fragmentation"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sleep_fragmentation_yesterday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sleep Fragmentation - Yesterday</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter yesterday's sleep fragmentation"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="resting_hr_avg_last_28_days"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Rest Heart Rate AVG - Last 28 Days (bpm)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter average resting heart rate"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resting_hr_yesterday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rest Heart Rate - Yesterday (bpm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter yesterday's resting heart rate"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
