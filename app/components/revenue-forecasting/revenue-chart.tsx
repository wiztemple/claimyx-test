"use client";

import { formatCurrency } from "@/lib/utils";
import { SimulationResult } from "@/types/types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface RevenueChartProps {
  simulationResult: SimulationResult;
  isDarkMode: boolean;
}

export function RevenueChart({
  simulationResult,
  isDarkMode,
}: RevenueChartProps) {
  const percentileLabels = [
    "5th",
    "10th",
    "25th",
    "50th",
    "75th",
    "90th",
    "95th",
  ];

  const data: ChartData<"line"> = {
    labels: percentileLabels,
    datasets: [
      {
        label: "Projected Revenue",
        data: simulationResult.percentiles || [],
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139, 92, 246, 0.2)",
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 6,
        pointBackgroundColor: "#8b5cf6",
        pointBorderColor: isDarkMode ? "#1e1e1e" : "#ffffff",
        pointBorderWidth: 2,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#8b5cf6",
        pointHoverBorderColor: isDarkMode ? "#1e1e1e" : "#ffffff",
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? "#e5e7eb" : "#111827",
          font: {
            size: 14,
            weight: "bold",
          },
        },
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
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 14,
        },
        callbacks: {
          label: function (context) {
            return `Revenue: ${formatCurrency(context.parsed.y)}`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return formatCurrency(value as number);
          },
          color: isDarkMode ? "#e5e7eb" : "#111827",
          font: {
            size: 12,
          },
        },
        grid: {
          color: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        ticks: {
          color: isDarkMode ? "#e5e7eb" : "#111827",
          font: {
            size: 12,
          },
        },
        grid: {
          color: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
  };

  return (
    <div className="h-72 w-full bg-slate-50 dark:bg-slate-900 p-4 rounded-xl shadow-none border border-slate-200 dark:border-slate-800">
      <Line data={data} options={options} />
    </div>
  );
}
