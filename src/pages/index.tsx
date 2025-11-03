export default function Home({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors rounded-tl-3xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Dashboard Summary of The Year</p>
      </div>
    </div>
  );
}
            