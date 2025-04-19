import { StatusConfigMapType } from "@/types/types";
import {
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  ArrowUp,
  ArrowDown,
  BarChart,
} from "lucide-react";

export const statusConfig: StatusConfigMapType = {
  Total: {
    title: "Total Billing",
    description: "All claims",
    amountLabel: "Total Claims",
    gradient: "from-indigo-500 to-purple-600",
    cardBg:
      "bg-gradient-to-br from-slate-50 to-white dark:bg-gradient-to-br dark:from-indigo-900/20 dark:to-gray-900",
    textColor: "text-indigo-800 dark:text-indigo-300",
    textColorBold: "text-indigo-700 dark:text-indigo-400",
    indicatorBg: "bg-indigo-100 dark:bg-indigo-900/40",
    dotColor: "bg-indigo-400",
    iconBg: "bg-gradient-to-br from-indigo-500 to-purple-600",
    spriteBg:
      "radial-gradient(circle at 90% 10%, rgba(99, 102, 241, 0.1) 0%, transparent 40%)",
    icon: <DollarSign className="h-4 w-4" />,
    trendIcon: <BarChart className="h-3 w-3" />,
    spriteElements: (
      <>
        <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-indigo-100/20 -mt-10 -mr-10"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 rounded-full bg-slate-200/30"></div>
      </>
    ),
  },
  Pending: {
    title: "Pending",
    description: "Claims awaiting review",
    amountLabel: "Pending Amount",
    gradient: "from-yellow-500 to-amber-600",
    cardBg:
      "bg-gradient-to-br from-gray-50 to-white dark:bg-gradient-to-br dark:from-amber-900/20 dark:to-gray-900",
    textColor: "text-yellow-800 dark:text-yellow-300",
    textColorBold: "text-yellow-700 dark:text-yellow-400",
    indicatorBg: "bg-yellow-100 dark:bg-yellow-900/40",
    dotColor: "bg-yellow-300",
    iconBg: "bg-gradient-to-br from-yellow-400 to-amber-600",
    spriteBg:
      "radial-gradient(circle at 90% 10%, rgba(251, 191, 36, 0.1) 0%, transparent 40%)",
    icon: <Clock className="h-4 w-4" />,
    trendIcon: <TrendingUp className="h-3 w-3" />,
    spriteElements: (
      <>
        <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-slate-100/30 -mt-8 -mr-8"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 rounded-full bg-gray-200/30"></div>
      </>
    ),
  },
  Approved: {
    title: "Approved",
    description: "Claims approved",
    amountLabel: "Approved Amount",
    gradient: "from-green-400 to-emerald-600",
    cardBg:
      "bg-gradient-to-br from-blue-50 to-white dark:from-green-900/20 dark:to-gray-900",
    textColor: "text-green-800 dark:text-green-300",
    textColorBold: "text-green-700 dark:text-green-400",
    indicatorBg: "bg-green-100 dark:bg-green-900/40",
    dotColor: "bg-green-400",
    iconBg: "bg-gradient-to-br from-green-400 to-emerald-600",
    spriteBg:
      "radial-gradient(circle at 90% 10%, rgba(16, 185, 129, 0.1) 0%, transparent 40%)",
    icon: <CheckCircle className="h-4 w-4" />,
    trendIcon: <ArrowUp className="h-3 w-3" />,
    spriteElements: (
      <>
        <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-blue-100/10 -mt-8 -mr-8"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 rounded-full bg-blue-50/30"></div>
      </>
    ),
  },
  Denied: {
    title: "Denied",
    description: "Claims denied",
    amountLabel: "Denied Amount",
    gradient: "from-red-400 to-rose-600",
    cardBg:
      "bg-gradient-to-br from-zinc-50 to-white dark:from-red-900/20 dark:to-gray-900",
    textColor: "text-red-800 dark:text-red-300",
    textColorBold: "text-red-700 dark:text-red-400",
    indicatorBg: "bg-red-100 dark:bg-red-900/40",
    dotColor: "bg-red-400",
    iconBg: "bg-gradient-to-br from-red-400 to-rose-600",
    spriteBg:
      "radial-gradient(circle at 90% 10%, rgba(248, 113, 113, 0.1) 0%, transparent 40%)",
    icon: <XCircle className="h-4 w-4" />,
    trendIcon: <ArrowDown className="h-3 w-3" />,
    spriteElements: (
      <>
        <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-zinc-200/20 -mt-8 -mr-8"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 rounded-full bg-gray-100/30"></div>
      </>
    ),
  },
};
