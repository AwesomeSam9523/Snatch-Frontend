"use client";
import React, { useState, useEffect } from "react";
import { motion, useAnimate, stagger } from "framer-motion";

const Pool = () => {
  const [selectedRound, setSelectedRound] = useState(1);
  const [scope, animate] = useAnimate();

  // Mock data to simulate the teams
  const teams = [
    { id: 1, name: "Team A", poolno: 1, round: 1, avatar: "/avatars/avatar1.png" },
    { id: 2, name: "Team B", poolno: 1, round: 1, avatar: "/avatars/avatar1.png" },
    { id: 3, name: "Team C", poolno: 1, round: 1, avatar: "/avatars/avatar1.png" },
    { id: 4, name: "Team D", poolno: 1, round: 1, avatar: "/avatars/avatar1.png" },
  ];

  
  const staggerList = stagger(0.15, { startDelay: 0.2 });

  useEffect(() => {
    animate(
      "ul",
      { opacity: 1, y: 0 },
      { type: "spring", bounce: 0, duration: 0.5 }
    );

    animate(
      "li",
      { opacity: 1, scale: 1, x: 0 },
      { duration: 0.3, delay: staggerList }
    );
  }, [selectedRound]); 
  return (
    <div className="grid grid-cols-2">
      <div className="bg-white p-6 m-4 rounded-lg shadow-lg border">
        <h3 className="text-2xl text-center font-semibold text-gray-400 mb-4">
          Pool #{selectedRound}
        </h3>

        {/* Animated List Container */}
        <div ref={scope}>
          <ul className="space-y-4 opacity-0 translate-y-5">
            {teams
              .filter((team) => team.round === selectedRound)
              .map((team) => (
                <motion.li
                  key={team.id}
                  className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-md opacity-0 scale-75 -translate-x-10"
                >
                  <span className="font-Hanson rounded-[27.58px] bg-gray-200 text-black font-semibold py-2 px-4">
                    #1
                  </span>
                  <img src={team.avatar} alt={team.name} className="w-14 h-14 rounded-full" />
                  <button className="rounded-lg bg-gray-300 font-normal px-4 py-2">
                    {team.name}
                  </button>
                </motion.li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pool;
