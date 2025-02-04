"use client";
import React, { Suspense } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import Loading from "./Loading/page";
import Image from "next/image";

const Login = () => {
  return (
    <div className="relative h-screen w-full flex justify-center items-center bg-[url('/rectangle.png')] bg-cover bg-center">
      {/* Logos at opposite top corners */}
      <div className="absolute flex w-full justify-between top-4 left-0 right-0 z-20 px-8">
        <Image
          src="/snatchlogologin.png"
          width={200}
          height={200}
          alt="Snatch Logo"
          className="object-contain"
        />
        <Image
          src="/ieee.png"
          width={150}
          height={150}
          alt="IEEE Logo"
          className="object-contain"
        />
      </div>
      
      <Suspense fallback={<Loading />}>
        {/* Gooey Background (Fixed at Top, Animated Wave at Bottom) */}
        <div className="absolute top-0 left-0 w-full h-3/4 bg-gradient-to-b from-black  to-transparent blur-sm z-0 overflow-hidden border-transparent">
          <div className="absolute bottom-0 left-0 w-full h-full blur-[30px] animate-gooey border-transparent"></div>
        </div>

        {/* Sign-in Box (Above Gooey) */}
        <div className="relative z-10 border border-white rounded-3xl p-10 flex justify-center items-center flex-col gap-14 bg-black/30 backdrop-blur-xl">
          <div className="flex justify-center items-center flex-col border-transparent">
            <h1 className="text-6xl tracking-tighter font-semibold text-white border-transparent">
              Welcome!
            </h1>
            <label className="text-[#8c9f93] border-transparent">
              Please sign in to your account
            </label>
          </div>
          <div className="flex justify-center items-center flex-col gap-6 border-transparent">
            <Input
              type="text"
              placeholder="Username"
              className="bg-transparent text-white"
            />
            <Input
              type="password"
              className="bg-transparent text-white"
              placeholder="Password"
            />
          </div>
          <div className="border-transparent">
            <Button
              variant="outline"
              className="h-12 bg-transparent text-white w-20 rounded-xl"
            >
              <FaArrowRight className="w-16 border-transparent" />
            </Button>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Login;
