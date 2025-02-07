"use client"
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const getCardColors = (id, isSelected) => {
  if (!isSelected) return 'bg-gray-400 border-2 border-white hover:bg-gray-500';
  
  switch (id) {
    case 'freeze':
      return 'bg-blue-500 border-4 border-white shadow-blue-300';
    case 'shield':
      return 'bg-yellow-500 border-4 border-white shadow-yellow-300';
    case 'rebound':
      return 'bg-red-500 border-4 border-white shadow-red-300';
    default:
      return 'bg-gray-400 border-2 border-white';
  }
};

const PowerUpCard = ({ image, title, id, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full transition-all duration-300 ease-in-out 
      ${getCardColors(id, isSelected)}
      rounded-xl p-6 flex flex-col items-center
      ${isSelected ? 'scale-105 shadow-lg' : 'hover:scale-102'}
    `}
  >
    <Image
      src={image}
      width={300}
      height={300}
      alt={title}
      className="transition-transform duration-300"
    />
    <span className="text-white font-bold mt-2">{title}</span>
  </button>
);

const WildcardDialog = ({ open, onOpenChange }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleConfirm = () => {
    if (selectedCard) {
      console.log(`Converting Wildcard to ${selectedCard}`);
    }
    onOpenChange(false);
  };

  const powerUpCards = [
    { id: 'freeze', title: 'FREEZE', image: '/Freeze2.png' },
    { id: 'shield', title: 'SHIELD', image: '/shield1.png' },
    { id: 'rebound', title: 'REBOUND', image: '/freeze2.png' }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-green-600 max-w-2xl p-8 rounded-xl border-4 border-white">
        {/* Top Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16">
            <Image
              src="/wildcard1.png"
              width={200}
              height={200}
              alt="wildcard"
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-4xl font-bold text-white text-center mb-8">
          WILDCARD
        </h2>

        {/* Power-up Cards Grid */}
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
          THIS POWER-UP CAN BE CHANGED INTO ANY OF THE OTHER 3 POWER UP CARDS.
          <br />
          CAN BE USED ONLY ONCE!
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            variant="destructive"
            onClick={() => {
              setSelectedCard(null);
              onOpenChange(false);
            }}
            className="bg-red-700 hover:bg-red-800 text-white px-8 py-6 text-lg rounded-full"
          >
            CANCEL
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedCard}
            className={`px-8 py-6 text-lg rounded-full transition-colors duration-300
              ${!selectedCard 
                ? 'bg-gray-300 cursor-not-allowed text-gray-600' 
                : 'bg-white hover:bg-gray-100 text-green-600'
              }`}
          >
            CONFIRM
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WildcardDialog;