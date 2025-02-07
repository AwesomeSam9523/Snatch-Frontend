"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const FreezeDialog = ({ isOpen, setIsOpen }) => {
  const teams = [
    { name: "Untitled Name", avatar: "/ieee1.png", attackColor: "text-purple-500" },
    { name: "BHEEM KI SHAKTI DHOOM MACHAYE", avatar: "/ieee1.png", attackColor: "text-orange-500" },
    { name: "Meep Morp Zeep", avatar: "/ieee1.png", attackColor: "text-green-500" },
  ];

  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleConfirm = () => {
    if (selectedTeam !== null) {
      console.log("Selected Team:", teams[selectedTeam]);
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} className="rounded-2xl">
      <DialogContent className="bg-[#01bffe] rounded-2xl p-6 w-full max-w-md">
        {/* Accessible Dialog Title */}
        <DialogTitle className="sr-only">Freeze Power-Up</DialogTitle>

        <div className="flex flex-col items-center">
          {/* Snowflake Icon */}
          <Image src="/freeze2.png" alt="Freeze Icon" width={100} height={100} />
          
          {/* Visible Title */}
          <h2 className="text-white text-4xl font-bold mt-4">FREEZE</h2>

          {/* Description */}
          <p className="text-white text-center mt-2 text-sm">
            THIS POWER-UP CAN BE USED TO FREEZE ANY TEAM FOR 5 MINUTES.<br />
            CAN BE USED ONLY ONCE
          </p>

          {/* Team List */}
          <div className="mt-6 w-full space-y-4">
            {teams.map((team, index) => (
              <div
                key={index}
                onClick={() => setSelectedTeam(index)}
                className={`flex items-center justify-between rounded-xl p-3 shadow-md cursor-pointer transition duration-300 
                  ${selectedTeam === index 
                    ? "bg-blue-200/70 border-2 border-blue-500 shadow-lg scale-105" 
                    : "bg-white hover:bg-gray-100"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Image src={team.avatar} alt={team.name} width={40} height={40} className="rounded-full" />
                  <span className="text-gray-800 font-medium">{team.name}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex w-full justify-between mt-6">
            <Button variant="destructive" className="px-6 py-2 text-lg" onClick={() => setIsOpen(false)}>
              CANCEL
            </Button>
            <Button variant="secondary" className="px-6 py-2 text-lg" onClick={handleConfirm} disabled={selectedTeam === null}>
              CONFIRM
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FreezeDialog;

