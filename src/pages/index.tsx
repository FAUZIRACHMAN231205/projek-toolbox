import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "./user/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className={`${geistSans.className} ${geistMono.className} font-sans min-h-screen bg-gray-50`}> 
      <div className="flex">
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 p-8">
          <header className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-500">Dashboard Summary of The Year</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-white p-2 rounded-md shadow">📅 2025</button>
              <button className="bg-white p-2 rounded-md shadow">🌓</button>
            </div>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2 bg-white rounded-lg shadow p-6 flex items-center gap-6">
              <div className="bg-amber-100 p-3 rounded-md">
                <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3"></path></svg>
              </div>
              <div>
                <div className="text-xl font-bold">Good Morning, Riza!</div>
                <div className="text-gray-500">Welcome to the Toolbox Dashboard. Have a productive day!</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between">
              <div className="text-sm text-gray-500">Today&#39;s Jobs</div>
              <div className="text-3xl font-bold">6</div>
            </div>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-5">
              <div className="text-sm text-gray-500">Total Project</div>
              <div className="text-2xl font-bold">28</div>
            </div>
            <div className="bg-white rounded-lg shadow p-5">
              <div className="text-sm text-gray-500">Open Project</div>
              <div className="text-2xl font-bold">8</div>
            </div>
            <div className="bg-white rounded-lg shadow p-5">
              <div className="text-sm text-gray-500">Progress Project</div>
              <div className="text-2xl font-bold">16</div>
            </div>
            <div className="bg-white rounded-lg shadow p-5">
              <div className="text-sm text-gray-500">Closed Project</div>
              <div className="text-2xl font-bold">4</div>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Summary of Project 2025</h3>
              <div className="h-48 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded"></div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Employee Jobs Summary 2025</h3>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-500">Total Jobs</div>
                  <div className="text-2xl font-bold">394</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Completion Rate</div>
                  <div className="text-2xl font-bold">76%</div>
                </div>
              </div>
              <div className="h-4 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: '76%' }} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
