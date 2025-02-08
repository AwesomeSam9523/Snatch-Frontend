"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import FreezeDialog from "@/app/madeComponents/FreezeDialog";
import ShieldDialog from "@/app/madeComponents/ShieldDialog";
import ReboundDialog from "@/app/madeComponents/ReboundDialog";
import WildcardDialog from "@/app/madeComponents/WildcardDialog";
import Image from "next/image";

const LeaderboardItem = ({ rank, name, score }) => (
  <TableRow className="transition-transform transform hover:scale-105 hover:bg-gray-100 duration-300 ease-in-out">
    <TableCell className="font-medium">{rank}</TableCell>
    <TableCell>{name}</TableCell>
    <TableCell className="text-right">{score}</TableCell>
  </TableRow>
);

const PowerUpItem = ({ title, imageSrc, onClick, disabled }) => (
  <div
    className={`flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-2xl transition-all transform hover:scale-105 hover:shadow-xl hover:cursor-pointer duration-300 ease-in-out ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`}
    onClick={disabled ? null : onClick}
  >
    <Image
      src={imageSrc}
      alt={title}
      width={200}
      height={200}
      className="mb-2"
    />
    <h3 className="text-lg font-semibold">{title}</h3>
  </div>
);

const UserHome = () => {
  const searchParams = useSearchParams();
  const [teamId, setTeamId] = useState(""); // State for teamId
  const token = searchParams.get("token");
  const [leaderboard, setLeaderboard] = useState([]);
  const [powerUps, setPowerUps] = useState([]); // Store power-up data
  const [isFreezeOpen, setIsFreezeOpen] = useState(false);
  const [isShieldOpen, setIsShieldOpen] = useState(false);
  const [isReboundOpen, setIsReboundOpen] = useState(false);
  const [isWildcardOpen, setIsWildcardOpen] = useState(false);

  const [currentPowerUp, setCurrentPowerUp] = useState(null);
  const [timer, setTimer] = useState(600); // 10 minutes countdown in seconds
  const [selectedPowerUp, setSelectedPowerUp] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          "https://snatch-ieeecs-backend.vercel.app/leaderboard",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        if (data.success) {
          setLeaderboard(
            data.data
              .sort((a, b) => b.score - a.score)
              .map((item, index) => ({
                rank: index + 1,
                name: item.team.name,
                score: item.score,
              }))
          );
        }
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      }
    };

    const fetchPowerUps = async () => {
      try {
        const response = await fetch(
          "https://snatch-ieeecs-backend.vercel.app/powerups",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        if (data.success) {
          setPowerUps(data.data[0].powerups); // Assuming the power-ups are in the data array
        }
      } catch (error) {
        console.error("Failed to fetch power-ups:", error);
      }
    };

    if (token) {
      fetchLeaderboard();
      fetchPowerUps(); // Fetch the power-ups when the component is mounted
    }
  }, [token]);

  const openDialog = (type) => {
    if (!currentPowerUp) {
      setSelectedPowerUp(type); // Set the selected power-up for later confirmation
      switch (type) {
        case "freeze":
          setIsFreezeOpen(true);
          break;
        case "shield":
          setIsShieldOpen(true);
          break;
        case "rebound":
          setIsReboundOpen(true);
          break;
        case "wildcard":
          setIsWildcardOpen(true);
          break;
        default:
          break;
      }
    }
  };

  const startTimer = () => {
    setCurrentPowerUp(selectedPowerUp); // Set the active power-up
    setTimer(600); // Reset to 10 minutes
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCurrentPowerUp(null); // Reset power-up after 10 minutes
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-Hanson lg:text-6xl font-bold text-5xl">
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row justify-evenly max-h-64 overflow-y-auto">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Player</TableCell>
                  <TableCell>Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboard.map((item) => (
                  <LeaderboardItem
                    key={item.rank}
                    rank={item.rank}
                    name={item.name}
                    score={item.score}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Power-Ups Section */}
      <div className="mt-8">
        <h2 className="font-Hanson lg:text-6xl font-bold text-5xl mb-4 mx-4">
          Power Ups
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {powerUps.map((item, index) => (
            <PowerUpItem
              key={index}
              title={item.name.toUpperCase()}
              imageSrc={`/${item.name}.png`}
              onClick={() => openDialog(item.name)} // Open dialog on click
              disabled={!!currentPowerUp || !item.available} // Disable other power-ups if one is active or unavailable
            />
          ))}
        </div>
      </div>

      {/* Power-Up Dialogs */}
      <ShieldDialog
        open={isShieldOpen}
        onOpenChange={setIsShieldOpen}
        onConfirm={startTimer}
      />
      <ReboundDialog
        open={isReboundOpen}
        onOpenChange={setIsReboundOpen}
        onConfirm={startTimer}
      />
      <WildcardDialog
        open={isWildcardOpen}
        onOpenChange={setIsWildcardOpen}
        teamId={teamId}
      />
      <FreezeDialog
        open={isFreezeOpen}
        onOpenChange={setIsFreezeOpen}
        onConfirm={startTimer}
      />

      {/* Current Active Power-Up Section */}
      {currentPowerUp && (
        <div className="mt-8 bg-gray-100 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-2">
            Current Active Power-Up: {currentPowerUp}
          </h3>
          <p className="text-lg">Time Left: {formatTime(timer)}</p>
        </div>
      )}
    </div>
  );
};

export default UserHome;
