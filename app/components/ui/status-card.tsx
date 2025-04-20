"use client";

import { Card } from "@/app/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { StatusConfigType, StatusDataType } from "@/types/types";

interface StatusCardProps {
  status: string;
  config: StatusConfigType;
  data: StatusDataType;
}

export function StatusCard({ status, config, data }: StatusCardProps) {
  const countLabel = status === "Total" ? "Total Claims" : "Claims";

  return (
    <Card
      className={`shadow-sm rounded-xl overflow-hidden border-0 ${config.cardBg} relative transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 h-full`}
    >
      {config.spriteElements}
      <div className="p-4 flex flex-col relative z-10 h-full">
        <div className="flex justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-full ${config.iconBg} shadow-sm`}>
              {config.icon}
            </div>
            <h3
              className={`text-sm sm:text-base font-semibold ${config.textColor}`}
            >
              {config.title}
            </h3>
          </div>
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full ${config.indicatorBg} ${config.textColor} text-xs font-medium shadow-sm`}
          >
            {config.trendIcon}
            <span>
              {status === "Total" ? `${data.count}` : `${data.percentage}%`}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div>
            <p
              className={`text-xl sm:text-2xl font-bold ${config.textColorBold}`}
            >
              {status === "Total" ? formatCurrency(data.amount) : data.count}
            </p>
            <p className="text-xs text-gray-700 dark:text-white/70">
              {config.description}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-700 dark:text-white/70">
              {status === "Total" ? countLabel : config.amountLabel}
            </p>
            <p
              className={`text-xs sm:text-lg font-bold ${config.textColorBold}`}
            >
              {status === "Total" ? data.count : formatCurrency(data.amount)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
