"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const getCardColors = (id, isSelected) => {
  if (!isSelected) return "bg-gray-400 border-2 border-white hover:bg-gray-500";

  switch (id) {
    case "freeze":
      return "bg-blue-500 border-4 border-white shadow-blue-300";
    case "shield":
      return "bg-yellow-500 border-4 border-white shadow-yellow-300";
    case "rebound":
      return "bg-red-500 border-4 border-white shadow-red-300";
    default:
      return "bg-gray-400 border-2 border-white";
  }
};

const PowerUpCard = ({ image, title, id, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full transition-all duration-300 ease-in-out 
      ${getCardColors(id, isSelected)}
      rounded-xl p-6 flex flex-col items-center
      ${isSelected ? "scale-105 shadow-lg" : "hover:scale-102"}
    `}
  >
    <Image
      src={image}
      width={150}
      height={150}
      alt={title}
      className="transition-transform duration-300"
    />
    <span className="text-white font-bold mt-2">{title}</span>
  </button>
);

const WildcardDialog = ({ open, onOpenChange, teamId }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setSelectedCard(null);
      setError("");
      setLoading(false);
    }
  }, [open]);

  // Function to send the selected power-up to the backend
  const handleConfirm = async () => {
    console.log("Hello brother")
    if (!selectedCard || !teamId) return;
    
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://snatch-ieeecs-backend.vercel.app/powerups/use", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          powerUp: selectedCard,
          id: teamId,
        }),
      });

      
      const data = await response.json();
      if (data.success) {
        console.log(`Successfully applied ${selectedCard} power-up to team ${teamId}`);
        onOpenChange(false);
      } else {
        setError(data.message || "Failed to apply power-up.");
      }
    } catch (error) {
      console.error("Error applying power-up:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const powerUpCards = [
    { id: "freeze", title: "FREEZE", image: "/Freeze2.png" },
    { id: "shield", title: "SHIELD", image: "/shield1.png" },
    { id: "rebound", title: "REBOUND", image: "/freeze2.png" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-green-600 max-w-2xl p-8 rounded-xl border-4 border-white">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16">
            <Image src="/wildcard1.png" width={200} height={200} alt="wildcard" />
          </div>
        </div>

        <h2 className="text-4xl font-bold text-white text-center mb-8">WILDCARD</h2>

       
        <div className="grid grid-cols-3 gap-6 mb-8">
          {powerUpCards.map((card) => (
            <PowerUpCard
              key={card.id}
              id={card.id}
              image={card.image}
              title={card.title}
              isSelected={selectedCard === card.id}
              onClick={() => setSelectedCard(card.id)}
            />
          ))}
        </div>

        {/* Description Text */}
        <p className="text-white text-center text-xl mb-8">
          THIS POWER-UP CAN BE CHANGED INTO ANY OF THE OTHER 3 POWER-UP CARDS.
          <br />
          CAN BE USED ONLY ONCE!
        </p>

        {/* Error Message */}
        {error && <p className="text-red-300 text-center text-lg font-semibold mb-4">{error}</p>}

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            variant="destructive"
            onClick={() => {
              setSelectedCard(null);
              onOpenChange(false);
            }}
            className="bg-red-700 hover:bg-red-800 text-white px-8 py-6 text-lg rounded-full"
            disabled={loading}
          >
            CANCEL
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedCard || loading}
            className={`px-8 py-6 text-lg rounded-full transition-colors duration-300
              ${!selectedCard ? "bg-gray-300 cursor-not-allowed text-gray-600" : "bg-white hover:bg-gray-100 text-green-600"}
            `}
          >
            {loading ? "Applying..." : "CONFIRM"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WildcardDialog;
