import { AlertCircle, CheckCircle, Clock, Info } from "lucide-react";
import { StatusConfig } from "@/types/types";

export const getStatusConfig = (status: string): StatusConfig => {
  switch (status) {
    case "Approved":
      return {
        icon: <CheckCircle className="h-4 w-4" />,
        bgClass:
          "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
        iconClass: "text-green-600 dark:text-green-400",
      };
    case "Denied":
      return {
        icon: <AlertCircle className="h-4 w-4" />,
        bgClass: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
        iconClass: "text-red-600 dark:text-red-400",
      };
    case "Pending":
      return {
        icon: <Clock className="h-4 w-4" />,
        bgClass:
          "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300",
        iconClass: "text-amber-600 dark:text-amber-400",
      };
    default:
      return {
        icon: <Info className="h-4 w-4" />,
        bgClass:
          "bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-300",
        iconClass: "text-slate-600 dark:text-slate-400",
      };
  }
};
