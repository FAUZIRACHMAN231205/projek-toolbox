"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Card, CardContent } from "@/components/ui/card";
import {
  CalendarCheck,
  Plus,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Bookmark,
  Circle,
  Pencil,
  Eye,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { addDays, format, isSameDay } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { StatusCombobox } from "../ui/status-combobox";

const todoItems = [
  {
    title: "Pembuatan Report dan...",
    status: "Open",
    dateRange: "31 Oct - 30 Nov",
    type: "Project",
    color: "border-yellow-500",
  },
  {
    title: "Modul Inspection",
    status: "Open",
    dateRange: "03 Nov - 14 Nov",
    type: "Project",
    color: "border-yellow-500",
  },
  {
    title: "Ujicoba Consumable",
    status: "Open",
    dateRange: "03 Nov - 07 Nov",
    type: "Project",
    color: "border-yellow-500",
  },
];

const DateSelector = () => {
  const [displayDate, setDisplayDate] = useState(new Date(2025, 10, 4));
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 10, 4));

  const dates = Array.from({ length: 5 }, (_, i) => addDays(displayDate, i - 2));

  const handlePrev = () => {
    setDisplayDate(prev => addDays(prev, -1));
  };

  const handleNext = () => {
    setDisplayDate(prev => addDays(prev, 1));
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex items-center justify-between">
      <Button variant="ghost" size="icon" onClick={handlePrev}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="flex items-center gap-2">
        {dates.map((date, index) => (
          <div
            key={index}
            onClick={() => handleDateSelect(date)}
            className={cn(
              "text-center p-2 rounded-lg cursor-pointer w-16",
              isSameDay(date, selectedDate)
                ? "bg-green-600 text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            <div className="text-sm">{format(date, "Eee")}</div>
            <div className="font-bold text-lg">{format(date, "d")}</div>
          </div>
        ))}
      </div>
      <Button variant="ghost" size="icon" onClick={handleNext}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export function TodoListSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="p-2">
          <CalendarCheck size={18} className="text-gray-600 dark:text-gray-400" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[450px] sm:max-w-none bg-white dark:bg-gray-900">
        <SheetHeader className="flex flex-row items-center justify-between mb-4">
          <div>
            <SheetTitle>Todo List</SheetTitle>
            <p className="text-sm text-muted-foreground">
              Here is your to-do list.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full p-2 h-auto">
              <Plus size={20} />
            </Button>
          </div>
        </SheetHeader>

        <div className="space-y-4">
          <DateSelector />

          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Todo List</h3>
            <p className="text-sm text-muted-foreground">
              Selasa, 4 November 2025
            </p>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search Jobs..." className="pl-10" />
            </div>
            <StatusCombobox />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Total Data</p>
            <p className="text-sm font-medium">3 Data</p>
          </div>

          <div className="space-y-3">
            {todoItems.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className={`p-4 flex items-start gap-4 border-l-4 ${item.color}`}>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold">{item.title}</h4>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-auto w-auto p-0">
                            <MoreHorizontal size={20} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Circle className="w-4 h-4 mr-2" />
                            Ubah Status
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="w-4 h-4 mr-2" />
                            Perbarui
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            Detail
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{item.dateRange}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bookmark size={16} />
                        <span>{item.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                        <span className="text-yellow-500 bg-yellow-100/60 px-2 py-0.5 rounded-md text-xs">{item.status}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
