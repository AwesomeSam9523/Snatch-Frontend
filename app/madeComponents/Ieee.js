"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Login from "./Login";

const IEECS = () => {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // Show login page after 3 seconds
    const timer = setTimeout(() => {
      setShowLogin(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showLogin) {
    return <Login />;
  }

  return (
    <div className="relative h-screen w-full flex justify-center items-center bg-[url('/rectangle.png')] bg-cover bg-center">
      {/* Gooey Background */}
      <div className="absolute top-0 left-0 w-full h-3/4 bg-gradient-to-b from-black to-transparent blur-sm z-0 overflow-hidden border-transparent"></div>

      {/* Spinning IEEE Logo */}
      <motion.div
        initial={{ rotateX: 0, rotateY: 0 }}
        animate={{ rotateX: 0, rotateY: 360 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <Image
          src="/IEEELOGO.png"
          width={300}
          height={300}
          alt="IEEE Logo"
          className="object-contain"
        />
      </motion.div>
    </div>
  );
};

export default IEECS;
