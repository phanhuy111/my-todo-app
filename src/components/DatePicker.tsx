"use client";

import { addHours, format } from "date-fns";

import {
  Button,
  Calendar,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui";
import { useFormContext } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function DatePickerForm({
  onCallback,
  placeholder = "Chọn",
  name,
  label = null,
  disabled,
}: {
  onCallback?: (e?: Date) => void;
  placeholder?: string;
  name: string;
  label?: string | null;
  disabled?: boolean;
}) {
  const form = useFormContext();
  const TIMEZONE_OFFSET = new Date().getTimezoneOffset() / -60;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="flex w-full flex-col">
            {label ? <FormLabel>{label}</FormLabel> : null}
            <FormControl>
              <Popover>
                <PopoverTrigger asChild disabled={disabled}>
                  <Button
                    className={cn(
                      "justify-start text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                    variant="outline"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value
                      ? format(field.value, "dd/MM/yyyy")
                      : placeholder || "Chọn"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    initialFocus
                    mode="single"
                    onSelect={(e) => {
                      const adjustedDate = addHours(
                        e || new Date(),
                        TIMEZONE_OFFSET
                      );
                      field.onChange(adjustedDate);
                      onCallback?.(adjustedDate);
                    }}
                    selected={field.value}
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
