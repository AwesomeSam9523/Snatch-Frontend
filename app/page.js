"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import IEEECS from "./madeComponents/Ieee";
import Login from "./madeComponents/Login";

const Page = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <AnimatePresence>
      {!showLogin ? (
        <IEEECS onComplete={() => setShowLogin(true)} />
      ) : (
        <Login />
      )}
    </AnimatePresence>
  );
};

export default Page;
