"use client"

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MAX_INCREMENT = 20;

type QuantitySelectorProps = {
  onChange?: (value: number) => void;
  min?: number;
};

// The + button stops at MAX_INCREMENT, but the user can still type a bigger number
export function QuantitySelector({ onChange, min = 0 }: QuantitySelectorProps) {
  const [value, setValue] = useState(1);

  const update = (next: number) => {
    setValue(next);
    onChange?.(next);
  };

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <Button
        variant="discreet"
        className="size-7 min-h-0 border-2 px-0 sm:size-8 lg:size-10 lg:border-[3px]"
        disabled={value <= min}
        onClick={() => update(value - 1)}
        aria-label="Decrease quantity"
      >
        <Minus className="size-4 sm:size-5 lg:size-6" />
      </Button>

      <Input
        inputMode="numeric"
        value={value}
        onChange={(e) => {
          const next = parseInt(e.target.value.replace(/\D/g, ""), 10);
          update(Number.isNaN(next) ? min : Math.max(min, next));
        }}
        className="h-7 w-10 border-2 px-0 text-center font-bold sm:h-8 sm:w-12 lg:h-10 lg:w-14 lg:border-[3px] lg:text-lg"
      />

      <Button
        variant="discreet"
        className="size-7 min-h-0 border-2 px-0 sm:size-8 lg:size-10 lg:border-[3px]"
        disabled={value >= MAX_INCREMENT}
        onClick={() => update(value + 1)}
        aria-label="Increase quantity"
      >
        <Plus className="size-4 sm:size-5 lg:size-6" />
      </Button>
    </div>
  );
}