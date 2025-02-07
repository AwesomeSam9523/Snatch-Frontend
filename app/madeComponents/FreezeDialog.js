"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";



const FreezeDialog = ({ isOpen, setIsOpen }) => {
    const teams = [
      { name: "Untitled Name", avatar: "/ieee1.png", attackColor: "text-purple-500" },
      { name: "BHEEM KI SHAKTI DHOOM MACHAYE", avatar: "/ieee1.png", attackColor: "text-orange-500" },
      { name: "Meep Morp Zeep", avatar: "/ieee1.png", attackColor: "text-green-500" },
    ];
  
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen} className="rounded-2xl">
        <DialogContent className="bg-[#01bffe] rounded-2xl p-6 w-full max-w-md">
          <div className="flex flex-col items-center">
            {/* Snowflake Icon */}
            <Image src="/freeze2.png" alt="Freeze Icon" width={100} height={100} />
            
            {/* Title */}
            <h2 className="text-white text-4xl font-bold mt-4">FREEZE</h2>
  
            {/* Description */}
            <p className="text-white text-center mt-2 text-sm">
              THIS POWER-UP CAN BE USED TO FREEZE ANY TEAM FOR 5 MINUTES.<br />
              CAN BE USED ONLY ONCE
            </p>
  
            {/* Team List */}
            <div className="mt-6 w-full space-y-4">
              {teams.map((team, index) => (
                <div key={index} className="flex items-center justify-between bg-white rounded-xl p-3 shadow-md">
                  <div className="flex items-center gap-3">
                    <Image src={team.avatar} alt={team.name} width={40} height={40} className="rounded-full" />
                    <span className="text-gray-800 font-medium">{team.name}</span>
                  </div>
                  <span className={`font-semibold ${team.attackColor}`}>ATTACK</span>
                </div>
              ))}
            </div>
  
            {/* Buttons */}
            <div className="flex w-full justify-between mt-6">
              <Button variant="destructive" className="px-6 py-2 text-lg">CANCEL</Button>
              <Button variant="secondary" className="px-6 py-2 text-lg">CONFIRM</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };


  export default FreezeDialog;