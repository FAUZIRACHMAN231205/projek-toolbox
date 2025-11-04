"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "./input"

const statuses = [
  {
    value: "open",
    label: "Open",
    color: "bg-yellow-500",
  },
  {
    value: "progress",
    label: "Progress",
    color: "bg-blue-500",
  },
  {
    value: "review",
    label: "Review",
    color: "bg-purple-500",
  },
  {
    value: "closed",
    label: "Closed",
    color: "bg-green-500",
  },
]

export function StatusCombobox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[180px] justify-between"
        >
          {value
            ? statuses.find((status) => status.label.toLowerCase() === value)?.label
            : "All Status"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <div className="relative p-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search Status..." className="pl-8 w-full" />
          </div>
          <CommandEmpty>No status found.</CommandEmpty>
          <CommandGroup>
            {statuses.map((status) => (
              <CommandItem
                key={status.value}
                value={status.label.toLowerCase()}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <div className="flex items-center w-full">
                    <div className={cn("w-2 h-2 rounded-full mr-2", status.color)}></div>
                    <span className="flex-grow">{status.label}</span>
                    <Check
                        className={cn(
                        "h-4 w-4",
                        value === status.label.toLowerCase() ? "opacity-100" : "opacity-0"
                        )}
                    />
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
