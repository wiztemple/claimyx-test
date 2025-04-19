"use client";

import { Button } from "@/app/components/ui/button";
import { Play } from "lucide-react";

interface SimulationStartProps {
  onStart: () => void;
}

export function SimulationStart({ onStart }: SimulationStartProps) {
  return (
    <div className="h-72 flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="text-center">
        <Button
          onClick={onStart}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2 px-6 rounded-full"
        >
          <Play className="mr-2 h-4 w-4" />
          Run Simulation
        </Button>
      </div>
    </div>
  );
}
