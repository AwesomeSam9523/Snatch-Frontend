"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";

const BASE_URL = "https://snatch-ieeecs-backend.vercel.app"; // Replace with actual backend URL

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert("Login Successful!");
        router.push("/userHome");
      } else {
        alert(data.message || "Invalid credentials!");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full flex justify-center items-center bg-[url('/rectangle.png')] bg-cover bg-center">
      {/* Logos at opposite top corners */}
      <div className="absolute flex w-full justify-between top-4 left-0 right-0 z-20 px-8">
        <Image src="/snatchlogologin.png" width={200} height={200} alt="Snatch Logo" className="object-contain" />
        <Image src="/ieee.png" width={150} height={150} alt="IEEE Logo" className="object-contain" />
      </div>

      {/* Gooey Background */}
      <div className="absolute top-0 left-0 w-full h-3/4 bg-gradient-to-b from-black to-transparent blur-sm z-0 overflow-hidden border-transparent">
        <div className="absolute bottom-0 left-0 w-full h-full blur-[30px] animate-gooey border-transparent"></div>
      </div>

      {/* Sign-in Box */}
      <div className="relative z-10 border border-2 border-[#5CC77B] rounded-3xl p-10 flex justify-center items-center flex-col gap-14 bg-black/30 backdrop-blur-xl">
        <div className="flex justify-center items-center flex-col border-transparent">
          <h1 className="text-6xl tracking-tighter font-semibold text-white border-transparent">Welcome!</h1>
          <label className="text-[#8c9f93] border-transparent">Please sign in to your account</label>
        </div>

        <div className="flex justify-center items-center flex-col gap-6 border-transparent">
          {/* Username Input */}
          <div className="relative w-full">
            <img src="/username.png" alt="User Icon" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-[#2D8D48] text-white placeholder:text-white px-10 py-8 w-full border-2 border-[#2D8D48] rounded-lg focus:outline-none focus:border-[#1F6A36] focus:ring-0"
            />
          </div>

          {/* Password Input */}
          <div className="relative w-full">
            <img src="/password.png" alt="Password Icon" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#2D8D48] focus:outline-none placeholder:text-white px-10 py-8 w-full border-none rounded-lg"
            />
          </div>
        </div>

        {/* Login Button */}
        <div className="rounded-lg">
          <Button
            variant="outline"
            className="w-24 h-12 border-4 border-[#5CC77B] bg-transparent text-white rounded-full"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "..." : <FaArrowRight className="text-[#5CC77B] w-6 h-6" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
