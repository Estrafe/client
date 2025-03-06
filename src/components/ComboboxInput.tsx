"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

/** Example data; replace with your real items */
const FRAMEWORKS = [
    { value: "next.js", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
];

/**
 * A combobox that behaves like an input with auto-suggest,
 * using ShadCN/UI Command & Popover components.
 */
export function ComboboxInput() {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");

    // Filter the list based on the user's typed input
    const filteredItems = React.useMemo(() => {
        const lower = inputValue.toLowerCase().trim();
        if (!lower) return FRAMEWORKS;
        return FRAMEWORKS.filter((item) =>
            item.label.toLowerCase().includes(lower)
        );
    }, [inputValue]);

    // When user selects an item from the suggestions
    function handleSelectItem(itemValue: string) {
        const item = FRAMEWORKS.find((fw) => fw.value === itemValue);
        if (item) {
            setInputValue(item.label);
        }
        setOpen(false);
    }

    return (
        <div className="w-full max-w-sm">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div className="relative">
                        <Input
                            placeholder="Type or select a framework..."
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                // Open the popover as soon as user types
                                setOpen(true);
                            }}
                            onFocus={() => {
                                if (inputValue.length >= 0) setOpen(true);
                            }}
                            className="w-full"
                        />
                    </div>
                </PopoverTrigger>

                {/** Show suggestions if there's input or if the user has opened the popover */}
                {open && (
                    <PopoverContent className="p-0 w-full max-w-sm">
                        <Command>
                            {/*
                Optional: if you want the Command's own input to mirror the typed text:
                <CommandInput
                  placeholder="Search..."
                  value={inputValue}
                  onValueChange={(val) => setInputValue(val)}
                />
              */}
                            <CommandList>
                                {filteredItems.length === 0 ? (
                                    <CommandEmpty>No results found.</CommandEmpty>
                                ) : (
                                    <CommandGroup>
                                        {filteredItems.map((framework) => (
                                            <CommandItem
                                                key={framework.value}
                                                value={framework.value}
                                                onSelect={handleSelectItem}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        inputValue === framework.label
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                                {framework.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                )}
                            </CommandList>
                        </Command>
                    </PopoverContent>
                )}
            </Popover>
        </div>
    );
}
