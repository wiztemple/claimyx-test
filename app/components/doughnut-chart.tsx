"use client";

import { ChartDataType } from "@/types/types";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  TooltipItem,
  ChartOptions,
  ChartTypeRegistry,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

declare module "chart.js" {
  interface PluginOptionsByType<TType extends keyof ChartTypeRegistry> {
    centralText?: {
      display?: boolean;
      text?: string;
      color?: string;
      fontStyle?: string;
      sidePadding?: number;
      fontSize?: number;
    };
  }
}

interface DoughnutChartProps {
  data: ChartDataType;
  isDarkMode: boolean;
  centerText?: string;
}

export default function DoughnutChart({
  data,
  isDarkMode,
  centerText = "Total",
}: DoughnutChartProps) {
  const chartOptions: ChartOptions<"doughnut"> = {
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
      centralText: {
        display: true,
        text: centerText,
        color: isDarkMode ? "#e5e7eb" : "#111827",
        fontStyle: "bold",
        sidePadding: 20,
        fontSize: 20,
      },
    },
    layout: {
      padding: 10,
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

  // Custom plugin to render text in the center
  const centralTextPlugin = {
    id: "centralText",
    beforeDraw: function (chart: ChartJS) {
      const width = chart.width,
        height = chart.height,
        ctx = chart.ctx;

      const centerTextPlugin = chart.options?.plugins?.centralText;

      if (centerTextPlugin && centerTextPlugin.display) {
        ctx.restore();
        const fontSize = centerTextPlugin.fontSize || 20;
        ctx.font = `${
          centerTextPlugin.fontStyle || "bold"
        } ${fontSize}px Arial`;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        const text = centerTextPlugin.text || "";
        const centerX = width / 2;
        const centerY = height / 2;

        ctx.fillStyle = centerTextPlugin.color || "#000";
        ctx.fillText(text, centerX, centerY);
        ctx.save();
      }
    },
  };

  // Register the custom plugin
  ChartJS.register(centralTextPlugin);

  return <Doughnut data={chartData} options={chartOptions} />;
}
