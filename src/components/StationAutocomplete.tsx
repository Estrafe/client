"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { MapPin } from "lucide-react";
import { Station } from "@/app/dashboard/model";

interface StationAutocompleteProps {
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    stations: Station[];
    // Optional custom class names:
    containerClassName?: string;
    inputClassName?: string;
    highlightClassName?: string;
}

export default function StationAutocomplete({
                                                label,
                                                placeholder,
                                                value,
                                                onChange,
                                                stations,
                                                containerClassName = "",
                                                inputClassName = "",
                                                highlightClassName = "",
                                            }: StationAutocompleteProps) {
    const [open, setOpen] = useState(false);
    // For display purposes, we keep a local state for the station name.
    const [displayValue, setDisplayValue] = useState("");

    // Update display value whenever the selected value or stations change.
    useEffect(() => {
        const found = stations.find((station) => station.id === value);
        setDisplayValue(found ? found.name : "");
    }, [value, stations]);

    const handleSelect = (stationName: string, stationId: string) => {
        setDisplayValue(stationName);
        onChange(stationId);
        setOpen(false);
    };

    return (
        <div className={`relative w-full ${containerClassName}`}>
            <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-1">
                <MapPin className="h-4 w-4 text-violet-estrafe dark:text-red-200" /> {label}
            </label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Input
                        value={displayValue}
                        placeholder={placeholder}
                        className={`text-sm bg-white dark:bg-slate-600 dark:text-white cursor-text transition-all ${inputClassName} ${highlightClassName} dark:border-gray-500`}
                        onFocus={() => setOpen(true)}
                        readOnly
                    />
                </PopoverTrigger>
                <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] p-0">
                    <Command>
                        <CommandEmpty>No station found.</CommandEmpty>
                        <CommandGroup>
                            {stations.map((station, index) => (
                                <CommandItem
                                    key={station.id || index} // Use station.id or fallback to index if necessary.
                                    onSelect={() => handleSelect(station.name, station.id)}
                                    className="flex items-center cursor-pointer"
                                >
                                    <MapPin className="h-4 w-4 text-violet-estrafe dark:text-red-200 mr-2" />
                                    <span className="font-medium dark:text-white">{station.name}</span>
                                    <span className="text-sm text-gray-500 ml-auto">
                                        {station.city ? station.city.name : "No city"}
                                    </span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
