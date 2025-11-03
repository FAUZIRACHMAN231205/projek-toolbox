import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar/index";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      // Check system preference if no saved theme
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      }
    }
  }, []);
  
  return (
    <div className="flex min-h-screen bg-green-600 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`flex-1 transition-all ${isSidebarOpen ? "ml-[280px]" : "ml-20"} p-4`}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="p-6">
            <Component {...pageProps} />
          </main>
        </div>
      </div>
    </div>
  );
}
