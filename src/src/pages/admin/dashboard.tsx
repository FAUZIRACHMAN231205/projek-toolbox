import { useState, useEffect } from "react";
import withAuth from "@/utils/withAuth";
import LoginSuccessModal from '@/components/LoginSuccessModal';

function AdminDashboard() {
  const [users, setUsers] = useState<
    { username: string; password: string; role: string }[]
  >([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // success popup state
  const [showSuccess, setShowSuccess] = useState(false);
  const [successName, setSuccessName] = useState("");
  const [successRedirect, setSuccessRedirect] = useState("");

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

  // show success modal if redirected after login
  useEffect(() => {
    try {
      const raw = localStorage.getItem('justLoggedIn');
      if (raw) {
        const parsed = JSON.parse(raw);
        setSuccessName(parsed.username || '');
        setSuccessRedirect('/admin/dashboard');
        setShowSuccess(true);
      }
    } catch (err) {
      // ignore
    }
  }, []);

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
    <>
    <div className="p-8">
      <h1 className="text-2xl font-bold text-green-700 mb-4">
        Admin Dashboard
      </h1>
      <p className="mb-6">Buat akun baru agar bisa login ke aplikasi.</p>

      {/* 🔹 Form tambah user */}
      <form onSubmit={handleAddUser} className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Username"
          className="border px-4 py-2 rounded w-1/3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border px-4 py-2 rounded w-1/3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Tambah User
        </button>
      </form>

      {/* 🔹 Daftar user */}
      <h2 className="text-xl font-semibold mb-2">Daftar User</h2>
      <ul className="list-disc list-inside">
        {users.map((u, idx) => (
          <li key={idx}>
            <span className="font-medium">{u.username}</span> (
            role: {u.role})
          </li>
        ))}
      </ul>
      </div>
      {showSuccess && (
        <LoginSuccessModal name={successName} onClose={() => setShowSuccess(false)} />
      )}
      </>
    );
}

export default withAuth(AdminDashboard, { allowedRole: "admin" });

