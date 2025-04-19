"use client";

export function ClaimsTableSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="bg-slate-50 dark:bg-gradient-to-r dark:from-gray-900 dark:to-blue-900 rounded-tl-xl rounded-tr-xl p-5 -mx-6 -mt-6">
        <div className="h-7 w-full md:w-64 bg-slate-200 dark:bg-white/20 rounded-md"></div>
        <div className="h-5 w-full md:w-48 bg-slate-100 dark:bg-white/10 rounded-md mt-2"></div>
        <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
          <div className="h-10 w-full md:w-64 bg-slate-200 dark:bg-white/20 rounded-full"></div>
          <div className="h-10 w-full md:w-40 bg-slate-200 dark:bg-white/20 rounded-full"></div>
        </div>
      </div>
      <div className="rounded-xl overflow-hidden">
        <div className="h-10 bg-slate-50 dark:bg-slate-900 w-full"></div>
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="h-16 w-full border-b border-slate-100 dark:border-slate-800 flex items-center px-4"
          >
            <div className="grid grid-cols-7 gap-4 w-full">
              {[...Array(7)].map((_, cellIndex) => (
                <div
                  key={cellIndex}
                  className="h-5 bg-slate-200 dark:bg-slate-700 rounded-md"
                ></div>
              ))}
            </div>
          </div>
        ))}
        <div className="h-10 bg-slate-50 dark:bg-slate-900 w-full"></div>
      </div>
    </div>
  );
}
