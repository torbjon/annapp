'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
    age: z
        .string()
        .min(1, 'Age is required')
        .refine(val => !isNaN(Number(val)) && Number(val) > 0, {
            message: 'Age must be a positive number',
        })
        .refine(val => Number(val) <= 120, {
            message: 'Age must be 120 or less',
        }),
    lastPeriod: z.date({
        required_error: 'Please select the date of your last period',
    }),
});

type FormValues = z.infer<typeof formSchema>;

export function HealthForm() {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            age: '',
        },
    });

    function onSubmit(values: FormValues) {
        console.log(values);
        alert(`Submitted!\nAge: ${values.age}\nLast Period: ${format(values.lastPeriod, 'PPP')}`);
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Health Information</CardTitle>
                <CardDescription>
                    Please enter your age and the date of your last period.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Age</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter your age"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>Your current age in years.</FormDescription>
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
                                                        'w-full pl-3 text-left font-normal',
                                                        !field.value && 'text-muted-foreground',
                                                    )}>
                                                    {field.value ? (
                                                        format(field.value, 'PPP')
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
                                                disabled={date =>
                                                    date > new Date() ||
                                                    date < new Date('1900-01-01')
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        The first day of your last menstrual period.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Submit
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
