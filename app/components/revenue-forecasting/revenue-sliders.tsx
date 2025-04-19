"use client";

import { RevenueSimulationParams } from "@/types/types";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { RevenueSlider } from "./revenue-slider";

interface RevenueSlidersProps {
  simulationParams: RevenueSimulationParams;
  onSliderChange: (type: keyof RevenueSimulationParams, value: number) => void;
}

export function RevenueSliders({
  simulationParams,
  onSliderChange,
}: RevenueSlidersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <RevenueSlider
        label="Pending Claims Probability"
        value={simulationParams.pendingProbability}
        onChange={(value) => onSliderChange("pendingProbability", value[0])}
        icon={<Clock className="h-4 w-4" />}
        color="#f59e0b"
      />

      <RevenueSlider
        label="Approved Claims Probability"
        value={simulationParams.approvedProbability}
        onChange={(value) => onSliderChange("approvedProbability", value[0])}
        icon={<CheckCircle className="h-4 w-4" />}
        color="#10b981"
      />

      <RevenueSlider
        label="Denied Claims Probability"
        value={simulationParams.deniedProbability}
        onChange={(value) => onSliderChange("deniedProbability", value[0])}
        icon={<XCircle className="h-4 w-4" />}
        color="#ef4444"
      />
    </div>
  );
}
