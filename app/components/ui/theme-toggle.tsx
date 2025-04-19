"use client";

import * as React from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { useTheme } from "@/app/providers/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="relative h-9 w-9 rounded-full border-none bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm"
      >
        <div className="h-5 w-5 animate-pulse bg-slate-300 dark:bg-slate-700 rounded-full" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative h-9 w-9 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 backdrop-blur-sm shadow-sm overflow-hidden"
        >
          {/* Light mode icon */}
          <Sun
            className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-amber-600 dark:-rotate-90 dark:scale-0`}
          />

          {/* Dark mode icon */}
          <Moon
            className={`absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all text-indigo-400 dark:rotate-0 dark:scale-100`}
          />

          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="rounded-xl backdrop-blur-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          data-selected={theme === "light"}
          className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-800"
        >
          <div className="p-1 rounded-full bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
            <Sun className="h-3.5 w-3.5" />
          </div>
          <span className={`${theme === "light" ? "font-medium" : ""}`}>
            Light
          </span>
          {theme === "light" && (
            <div className="ml-auto h-1.5 w-1.5 rounded-full bg-amber-500 dark:bg-amber-400 animate-scaleIn" />
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          data-selected={theme === "dark"}
          className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-800"
        >
          <div className="p-1 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">
            <Moon className="h-3.5 w-3.5" />
          </div>
          <span className={`${theme === "dark" ? "font-medium" : ""}`}>
            Dark
          </span>
          {theme === "dark" && (
            <div className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-scaleIn" />
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("system")}
          data-selected={theme === "system"}
          className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-800"
        >
          <div className="p-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            <Laptop className="h-3.5 w-3.5" />
          </div>
          <span className={`${theme === "system" ? "font-medium" : ""}`}>
            System
          </span>
          {theme === "system" && (
            <div className="ml-auto h-1.5 w-1.5 rounded-full bg-slate-500 dark:bg-slate-400 animate-scaleIn" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
