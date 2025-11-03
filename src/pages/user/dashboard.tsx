import withAuth from "@/utils/withAuth";

function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-6">Dashboard Summary of The Year</p>
      
      {/* Konten dashboard akan ditambahkan di sini */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card placeholder */}
      </div>
    </div>
  );
}

// ✅ proteksi dengan role user
export default withAuth(UserDashboard, { allowedRole: "user" });
