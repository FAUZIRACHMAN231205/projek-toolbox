import { useState, useEffect } from "react";
import Sidebar from "./user/sidebar";
import Navbar from "./user/navbar";
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
    <>
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`${isSidebarOpen ? "ml-[280px]" : "ml-20"} transition-all overflow-hidden`}>
        <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Component {...pageProps} isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
    </>
  );
}
