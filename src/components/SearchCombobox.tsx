"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { CommandDialog, CommandList, CommandItem } from "@/components/ui/command"

export function SearchCombobox() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")

  const items = [
    "New York",
    "Los Angeles",
    "Chicago",
    "San Francisco",
    "Houston",
    "Miami"
  ]

  // Filter items based on input
  const filteredItems = items.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
  )

  return (
      <div className="relative">
        {/* This is the Input that looks normal but opens the dropdown */}
        <div
            className="flex items-center border border-input bg-transparent px-3 py-2 text-sm rounded-md cursor-pointer focus:outline-none"
            onClick={() => setOpen(true)}
        >
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <span className="text-muted-foreground">{query || "Search..."}</span>
        </div>

        {/* The Command Dropdown Dialog */}
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput
              placeholder="Search..."
              value={query}
              onValueChange={setQuery}
          />
          <CommandList>
            {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                    <CommandItem
                        key={item}
                        onSelect={() => {
                          setQuery(item) // Set selected item as input value
                          setOpen(false) // Close dialog
                        }}
                    >
                      {item}
                    </CommandItem>
                ))
            ) : (
                <p className="text-sm text-muted-foreground p-4">No results found.</p>
            )}
          </CommandList>
        </CommandDialog>
      </div>
  )
}
