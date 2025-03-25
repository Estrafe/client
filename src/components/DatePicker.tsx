"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
    selectedDate?: Date;
    setSelectedDate: (date: Date | undefined) => void;
    label?: string;
    minDate?: Date;
}

export function DatePicker({ selectedDate, setSelectedDate, label, minDate }: DatePickerProps) {
    return (
        <div className="flex flex-col">
            {label && <p className="text-sm font-medium mb-1">{label}</p>}
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal bg-white dark:bg-gray-600 dark:text-white dark:border-gray-500",
                            !selectedDate && "text-muted-foreground bg-white dark:bg-gray-600 dark:text-gray-50 dark:border-gray-500",
                        )}
                    >
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => {
                            if (date <= new Date()) return true;
                            return !!(minDate && date < minDate);
                             // Ensure we always return a boolean
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
