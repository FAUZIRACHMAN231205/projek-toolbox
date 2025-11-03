export default function Home({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Dashboard Summary of The Year</p>
      </div>
    </div>
  );
}
            