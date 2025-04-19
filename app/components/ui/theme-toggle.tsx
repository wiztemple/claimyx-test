// // "use client";

// // import * as React from "react";
// // import { Moon, Sun, Laptop } from "lucide-react";

// // import { Button } from "@/app/components/ui/button";
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuTrigger,
// // } from "@/app/components/ui/dropdown-menu";
// // import { useTheme } from "@/app/providers/theme-provider";

// // export function ThemeToggle() {
// //   const { theme, setTheme, isDarkMode } = useTheme();
// //   const [mounted, setMounted] = React.useState(false);

// //   // Once mounted, we can show the correct icon
// //   React.useEffect(() => {
// //     setMounted(true);
// //   }, []);

// //   if (!mounted) {
// //     return (
// //       <Button
// //         variant="outline"
// //         size="icon"
// //         className="relative h-9 w-9 rounded-full border-none bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm"
// //       >
// //         <div className="h-5 w-5 animate-pulse bg-gray-300 dark:bg-gray-700 rounded-full"></div>
// //       </Button>
// //     );
// //   }

// //   return (
// //     <DropdownMenu>
// //       <DropdownMenuTrigger asChild>
// //         <Button
// //           variant="outline"
// //           size="icon"
// //           className="relative h-9 w-9 rounded-full border-none bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm overflow-hidden"
// //         >
// //           <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-100/50 dark:from-transparent dark:to-gray-800/30 backdrop-blur-sm"></div>

// //           <Sun
// //             className={`absolute h-[1.2rem] w-[1.2rem] text-amber-500 transition-all duration-500 ${
// //               isDarkMode
// //                 ? "opacity-0 rotate-90 scale-0"
// //                 : "opacity-100 rotate-0 scale-100"
// //             }`}
// //           />

// //           <Moon
// //             className={`absolute h-[1.2rem] w-[1.2rem] text-indigo-400 transition-all duration-500 ${
// //               isDarkMode
// //                 ? "opacity-100 rotate-0 scale-100"
// //                 : "opacity-0 -rotate-90 scale-0"
// //             }`}
// //           />

// //           <span className="sr-only">Toggle theme</span>
// //         </Button>
// //       </DropdownMenuTrigger>
// //       <DropdownMenuContent
// //         align="end"
// //         className="rounded-xl backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 shadow-lg"
// //       >
// //         <DropdownMenuItem
// //           onClick={() => setTheme("light")}
// //           className={`flex items-center gap-2 cursor-pointer ${
// //             theme === "light" ? "bg-gray-100 dark:bg-gray-800" : ""
// //           }`}
// //         >
// //           <div className="p-1 rounded-full bg-amber-100 text-amber-600">
// //             <Sun className="h-3.5 w-3.5" />
// //           </div>
// //           <span className={theme === "light" ? "font-medium" : ""}>Light</span>
// //           {theme === "light" && (
// //             <div className="ml-auto h-1.5 w-1.5 rounded-full bg-amber-500 animate-scaleIn"></div>
// //           )}
// //         </DropdownMenuItem>
// //         <DropdownMenuItem
// //           onClick={() => setTheme("dark")}
// //           className={`flex items-center gap-2 cursor-pointer ${
// //             theme === "dark" ? "bg-gray-100 dark:bg-gray-800" : ""
// //           }`}
// //         >
// //           <div className="p-1 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">
// //             <Moon className="h-3.5 w-3.5" />
// //           </div>
// //           <span className={theme === "dark" ? "font-medium" : ""}>Dark</span>
// //           {theme === "dark" && (
// //             <div className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-500 animate-scaleIn"></div>
// //           )}
// //         </DropdownMenuItem>
// //         <DropdownMenuItem
// //           onClick={() => setTheme("system")}
// //           className={`flex items-center gap-2 cursor-pointer ${
// //             theme === "system" ? "bg-gray-100 dark:bg-gray-800" : ""
// //           }`}
// //         >
// //           <div className="p-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
// //             <Laptop className="h-3.5 w-3.5" />
// //           </div>
// //           <span className={theme === "system" ? "font-medium" : ""}>
// //             System
// //           </span>
// //           {theme === "system" && (
// //             <div className="ml-auto h-1.5 w-1.5 rounded-full bg-gray-500 animate-scaleIn"></div>
// //           )}
// //         </DropdownMenuItem>
// //       </DropdownMenuContent>
// //     </DropdownMenu>
// //   );
// // }

// "use client";

// import * as React from "react";
// import { Moon, Sun, Laptop, SunIcon } from "lucide-react";
// import { Button } from "@/app/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/app/components/ui/dropdown-menu";
// import { useTheme } from "@/app/providers/theme-provider";

// export function ThemeToggle() {
//   const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = React.useState(false);

//   React.useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return (
//       <Button
//         variant="outline"
//         size="icon"
//         className="relative h-9 w-9 rounded-full border-none bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm"
//       >
//         <div className="h-5 w-5 animate-pulse bg-gray-300 dark:bg-gray-700 rounded-full" />
//       </Button>
//     );
//   }

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="outline"
//           size="icon"
//           className="relative h-9 w-9 rounded-full border-none bg-transparent dark:bg-slate-800 backdrop-blur-sm shadow-sm overflow-hidden"
//         >
//           <SunIcon className="absolute h-[1.2rem] w-[1.2rem] text-amber-600 transition-all opacity-0 scale-100  dark:opacity-100 dark:scale-0" />
//           <Moon className="absolute h-[1.2rem] w-[1.2rem] text-indigo-400 transition-all opacity-0 dark:opacity-100 scale-0 dark:scale-100" />

//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent
//         align="end"
//         className="rounded-xl backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 shadow-lg"
//       >
//         <DropdownMenuItem
//           onClick={() => setTheme("light")}
//           data-selected={theme === "light"}
//           className="flex items-center gap-2 cursor-pointer text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 hover:text-gray-600 data-[selected=true]:bg-gray-100 dark:data-[selected=true]:bg-gray-800"
//         >
//           <div className="p-1 rounded-full bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
//             <Sun className="h-3.5 w-3.5" />
//           </div>
//           <span className="font-medium data-[selected=false]:font-normal">
//             Light
//           </span>
//           {theme === "light" && (
//             <div className="ml-auto h-1.5 w-1.5 rounded-full bg-amber-500 dark:bg-amber-400 animate-scaleIn" />
//           )}
//         </DropdownMenuItem>

//         <DropdownMenuItem
//           onClick={() => setTheme("dark")}
//           data-selected={theme === "dark"}
//           className="flex items-center gap-2 cursor-pointer text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 hover:text-gray-600 data-[selected=true]:bg-gray-100 dark:data-[selected=true]:bg-gray-800"
//         >
//           <div className="p-1 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">
//             <Moon className="h-3.5 w-3.5" />
//           </div>
//           <span className="font-medium data-[selected=false]:font-normal">
//             Dark
//           </span>
//           {theme === "dark" && (
//             <div className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-scaleIn" />
//           )}
//         </DropdownMenuItem>

//         <DropdownMenuItem
//           onClick={() => setTheme("system")}
//           data-selected={theme === "system"}
//           className="flex items-center gap-2 cursor-pointer text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 hover:text-gray-600 data-[selected=true]:bg-gray-100 dark:data-[selected=true]:bg-gray-800"
//         >
//           <div className="p-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
//             <Laptop className="h-3.5 w-3.5" />
//           </div>
//           <span className="font-medium data-[selected=false]:font-normal">
//             System
//           </span>
//           {theme === "system" && (
//             <div className="ml-auto h-1.5 w-1.5 rounded-full bg-gray-500 dark:bg-gray-400 animate-scaleIn" />
//           )}
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

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
