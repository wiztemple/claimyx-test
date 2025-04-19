"use client";

import { ReactNode } from "react";
import { Slider } from "@/app/components/ui/slider";
import { Label } from "@/app/components/ui/label";

interface RevenueSliderProps {
  value: number;
  onChange: (value: number[]) => void;
  label: string;
  icon: ReactNode;
  color: string;
}

export function RevenueSlider({
  value,
  onChange,
  label,
  icon,
  color,
}: RevenueSliderProps) {
  return (
    <div className="space-y-3 p-5 bg-slate-50 dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="p-2 rounded-full transition-colors"
            style={{
              backgroundColor: `${color}20`,
              color: color,
            }}
          >
            {icon}
          </div>
          <Label className="text-base font-medium text-slate-800 dark:text-slate-300">
            {label}
          </Label>
        </div>
        <span
          className="text-sm font-bold p-1 px-3 rounded-full text-white"
          style={{ backgroundColor: color }}
        >
          {value}%
        </span>
      </div>
      <div className="pt-2">
        <Slider
          value={[value]}
          min={0}
          max={100}
          step={1}
          onValueChange={onChange}
          className="my-2"
        />
      </div>
    </div>
  );
}
