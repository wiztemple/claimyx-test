"use client";

import { ChartDataType } from "@/types/types";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  data: ChartDataType;
  isDarkMode: boolean;
}

export default function DoughnutChart({
  data,
  isDarkMode,
}: DoughnutChartProps) {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDarkMode
          ? "rgba(30, 41, 59, 0.8)"
          : "rgba(255, 255, 255, 0.8)",
        titleColor: isDarkMode ? "#e5e7eb" : "#111827",
        bodyColor: isDarkMode ? "#e5e7eb" : "#111827",
        borderColor: isDarkMode
          ? "rgba(255, 255, 255, 0.2)"
          : "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        boxWidth: 10,
        boxHeight: 10,
        boxPadding: 3,
        usePointStyle: true,
        callbacks: {
          title: (context: TooltipItem<"doughnut">[]) => {
            return data.labels[context[0].dataIndex];
          },
          label: (context: TooltipItem<"doughnut">) => {
            return `Count: ${context.raw}`;
          },
        },
      },
    },
  };

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: data.backgroundColor,
        borderColor: data.borderColor,
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  return <Doughnut data={chartData} options={chartOptions} />;
}
