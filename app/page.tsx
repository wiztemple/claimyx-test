"use client";

import { Dashboard } from "./components/dashboard";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // Only show the UI once mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen p-4 md:p-6 bg-white">
        <div className="h-screen w-full flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-6 transition-colors duration-300 bg-white dark:bg-slate-950">
      <Dashboard />
    </main>
  );
}
