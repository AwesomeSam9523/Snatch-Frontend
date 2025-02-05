"use client"
import React, { useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import FreezeDialog from "@/app/madeComponents /FreezeDialog";
import ShieldDialog from "@/app/madeComponents /ShieldDialog";
import ReboundDialog from "@/app/madeComponents /ReboundDialog";
import WildcardDialog from "@/app/madeComponents /WildcardDialog";

// Shield Dialog Component

const LeaderboardItem = ({ rank, name, score }) => (
  <TableRow className="transition-transform transform hover:scale-105 hover:bg-gray-100 duration-300 ease-in-out">
    <TableCell className="font-medium">{rank}</TableCell>
    <TableCell>{name}</TableCell>
    <TableCell className="text-right">{score}</TableCell>
  </TableRow>
);

const PowerUpItem = ({ title, imageSrc, onClick }) => (
  <div
    className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-2xl transition-all transform hover:scale-105 hover:shadow-xl hover:cursor-pointer duration-300 ease-in-out"
    onClick={onClick}
  >
    <Image src={imageSrc} alt={title} width={200} height={200} className="mb-2" />
    <h3 className="text-lg font-semibold">{title}</h3>
  </div>
);

const UserHome = () => {
  const [isFreezeOpen, setIsFreezeOpen] = useState(false);
  const [isShieldOpen, setIsShieldOpen] = useState(false);
  const [isReboundOpen, setIsReboundOpen] = useState(false);
  const [isWildcardOpen, setIsWildcardOpen] = useState(false);

  const leaderboard = [
    { rank: 1, name: "Power Rangers", score: 100 },
    { rank: 2, name: "Meep Morp Zeep", score: 90 },
    { rank: 3, name: "BHEEM KI SHAKTI DHOOM MACHAYE", score: 85 },
    { rank: 4, name: "Untitled Name", score: 22 },
    { rank: 5, name: "Team 5", score: 60 },
    { rank: 6, name: "Team 6", score: 45 },
  ];

  const powerUps = [
    { title: "FREEZE", imageSrc: "/Freeze.png", onClick: () => setIsFreezeOpen(true) },
    { title: "SHIELD", imageSrc: "/sheild.png", onClick: () => setIsShieldOpen(true) },
    { title: "REBOUND", imageSrc: "/rebound.png", onClick: () => setIsReboundOpen(true) },
    { title: "WILDCARD", imageSrc: "/wildcard.png", onClick: () => setIsWildcardOpen(true) },
  ];

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="lg:text-6xl font-bold text-5xl">Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-64 overflow-y-auto">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Player</TableCell>
                  <TableCell>Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboard.map((item, index) => (
                  <LeaderboardItem key={index} rank={item.rank} name={item.name} score={item.score} />
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Power-Ups */}
      <div className="mt-8">
        <h2 className="lg:text-6xl font-bold text-5xl mb-4 mx-4">Power Ups</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {powerUps.map((item, index) => (
            <PowerUpItem key={index} title={item.title} imageSrc={item.imageSrc} onClick={item.onClick} />
          ))}
        </div>
      </div>

      {/* Power-Up Dialogs */}
      <ShieldDialog open={isShieldOpen} onOpenChange={setIsShieldOpen} />
      <ReboundDialog open={isReboundOpen} onOpenChange={setIsReboundOpen} />
      <WildcardDialog open={isWildcardOpen} onOpenChange={setIsWildcardOpen} />
      {/* Assuming FreezeDialog is imported */}
      <FreezeDialog isOpen={isFreezeOpen} setIsOpen={setIsFreezeOpen} />
    </div>
  );
};

export default UserHome;