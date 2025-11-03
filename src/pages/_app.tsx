import { useState } from "react";
import Sidebar from "./user/sidebar";
import Navbar from "./user/navbar";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  return (
    <>
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={isSidebarOpen ? "ml-64 transition-all" : "ml-16 transition-all"}>
        <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Component {...pageProps} isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
    </>
  );
}
