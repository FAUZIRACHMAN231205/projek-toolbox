import { useState, useEffect } from "react";
import withAuth from "@/utils/withAuth";

function AdminDashboard() {
  const [users, setUsers] = useState<
    { username: string; password: string; role: string }[]
  >([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 🔹 Load users dari localStorage atau set default admin
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      const defaultAdmin = [{ username: "admin", password: "admin", role: "admin" }];
      localStorage.setItem("users", JSON.stringify(defaultAdmin));
      setUsers(defaultAdmin);
    }
  }, []);

  // 🔹 Update localStorage setiap ada perubahan
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  // 🔹 Tambah user baru (otomatis role: user)
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Username dan Password harus diisi!");
      return;
    }

    // cek duplikat
    const exists = users.some((u) => u.username === username);
    if (exists) {
      alert("Username sudah terdaftar!");
      return;
    }

    const newUser = { username, password, role: "user" };
    setUsers([...users, newUser]);

    setUsername("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-2 flex items-center gap-2">
          <span>Admin Dashboard</span>
        </h1>
        <p className="mb-8 text-gray-500 text-lg">Buat akun baru agar bisa login ke aplikasi.</p>

        {/* 🔹 Form tambah user */}
        <form onSubmit={handleAddUser} className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Username"
            className="border border-gray-300 px-4 py-2 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 px-4 py-2 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gradient-to-br from-green-600 to-green-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-green-700 hover:to-green-600 transition"
          >
            Tambah User
          </button>
        </form>

        {/* 🔹 Daftar user */}
        <div className="bg-gray-100 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-700">Daftar User</h2>
          <ul className="list-disc list-inside space-y-2">
            {users.map((u, idx) => (
              <li key={idx} className="text-gray-700">
                <span className="font-medium text-green-700">{u.username}</span> <span className="text-xs text-gray-500">(role: {u.role})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default withAuth(AdminDashboard, { allowedRole: "admin" });
