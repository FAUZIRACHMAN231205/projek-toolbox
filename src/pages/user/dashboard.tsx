import Image from "next/image";
import Link from "next/link";
import withAuth from "@/utils/withAuth"; // ✅ import HOC

function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Logo toolbox pojok kiri atas */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <Image
          src="/images/logo.png"
          alt="Toolbox Logo"
          width={28}
          height={28}
        />
        <div className="flex flex-col leading-tight">
          <span className="text-green-700 font-semibold">Toolbox</span>
          <span className="text-xs text-gray-500">v1.0.0</span>
        </div>
      </div>

      {/* Konten Dashboard */}
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Dashboard</h1>
        <p className="text-gray-600 mb-6">
          Selamat datang di dashboard pengguna! 🎉
        </p>

        <Link href="/auth/login" className="text-sm text-red-600 hover:underline">
          Logout
        </Link>
      </div>
    </div>
  );
}

// ✅ proteksi dengan role user
export default withAuth(UserDashboard, { allowedRole: "user" });
