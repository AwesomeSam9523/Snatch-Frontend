"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { post } from "../service";

export default function AdminLogin() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await post("login", { username, password });

      if (response.success) {
        localStorage.setItem("token", response.data.token);
        router.push("/admin");
      } else {
        alert(response.message || "Invalid credentials");
      }
    } catch (error) {
      alert("Login failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-xl font-semibold text-green-700 mb-4">
          Admin Login
        </h2>
        <input
          type="text"
          placeholder="username"
          className="w-full p-2 border rounded mb-2"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
