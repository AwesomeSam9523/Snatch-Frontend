"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const getPowerUpStyles = (powerUp) => {
  switch (powerUp) {
    case "SHIELD":
      return { bgColor: "bg-amber-600", borderColor: "border-amber-500" };
    case "FREEZE":
      return { bgColor: "bg-blue-500", borderColor: "border-blue-400" };
    case "REBOUND":
      return { bgColor: "bg-red-500", borderColor: "border-red-400" };
    default:
      return { bgColor: "bg-gray-500", borderColor: "border-gray-400" };
  }
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const ActivePowerUp = ( powerUp , onExpire) => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const { bgColor, borderColor } = getPowerUpStyles(powerUp);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onExpire && onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onExpire]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-gray-800 text-2xl font-bold mb-4">ACTIVE POWER-UP</h2>
      <Card className={`rounded-xl p-6 flex flex-col gap-4 shadow-lg border ${borderColor}`}>
        {/* Power-Up Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image
              src={`/${powerUp.toLowerCase()}.png`}
              width={40}
              height={40}
              alt={powerUp}
              className="rounded-full"
            />
            <span className="text-xl font-bold text-gray-900">{powerUp}</span>
          </div>
        </div>

        {/* Timer Progress Bar */}
        <Progress value={(timeLeft / 600) * 100} className={`${bgColor} h-3 rounded-full`} />

        {/* Timer Countdown */}
        <div className="flex justify-center">
          <span className="text-gray-700 text-lg font-semibold">
            Remaining: {formatTime(timeLeft)}
          </span>
        </div>
      </Card>
    </div>
  );
};

export default ActivePowerUp;
