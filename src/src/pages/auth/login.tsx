import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // 🔹 Login khusus admin
    if (username === "admin" && password === "admin") {
      localStorage.setItem("currentUser", JSON.stringify({ username: "admin", role: "admin" }));
      // set short-lived flag and redirect; dashboard will show the success modal
      try {
        localStorage.setItem("justLoggedIn", JSON.stringify({ username: "admin", role: "admin" }));
      } catch {}
      router.push("/admin/dashboard");
      return;
    }

    // 🔹 Login user biasa (cek dari localStorage)
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      try {
        const users = JSON.parse(storedUsers);
        const found = users.find(
          (u: { username: string; password: string }) =>
            u.username === username && u.password === password
        );

        if (found) {
          localStorage.setItem("currentUser", JSON.stringify({ username: found.username, role: "user" }));
          try {
            localStorage.setItem("justLoggedIn", JSON.stringify({ username: found.username, role: "user" }));
          } catch {}
          router.push("/auth/dashboard");
          return;
        }
      } catch (err) {
        // jika data users korup, bersihkan dan lanjutkan ke error message di bawah
        console.error("Failed to parse stored users:", err);
        localStorage.removeItem("users");
      }
    }

    alert("Username atau Password salah!");
  };

  

  return (
    <>
    <div className="flex h-screen relative bg-white">
      {/* 🔹 Toolbox info pojok kiri atas */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <Image
          src="/images/logo.png"
          alt="Toolbox Logo"
          width={32}
          height={32}
          priority
        />
        <div className="flex flex-col leading-tight">
          <span className="text-green-700 font-semibold">Toolbox</span>
          <span className="text-xs text-gray-500">v1.0.0</span>
        </div>
      </div>

      {/* Kiri: ilustrasi */}
      <div className="w-1/2 flex items-center justify-center border-r">
        <Image
          src="/images/office.png"
          alt="Office Illustration"
          width={700}
          height={700}
          priority
        />
      </div>

      {/* Kanan: card login */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="card-login w-[350px] p-6 rounded-2xl shadow-lg border bg-white">
          {/* Title */}
          <h2 className="login-title text-center text-2xl font-bold text-green-700">
            Login
          </h2>
          <p className="login-sub text-center text-gray-600 mb-4">
            Enter your username and password <br />
            below to login to your account
          </p>

          {/* Form */}
          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            {/* Username */}
            <input
              type="text"
              placeholder="Username"
              className="input-green"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* Password */}
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input-green"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-green-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Forgot password */}
            <div className="text-right -mt-2">
              <Link
                href="/auth/forgot-password"
                className="text-sm text-green-800 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Button */}
            <button type="submit" className="btn-primary w-full">
              Login
            </button>
          </form>
        </div>
      </div>
  </div>
    </>
  );
}
