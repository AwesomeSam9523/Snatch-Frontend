"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

const FreezeDialog = ({ open, onOpenChange, onConfirm, userTeamId, token }) => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [timer, setTimer] = useState(300); 
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all teams except the user's team
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
          console.log("leaderboard");
        const data = await response.json();
        if (data.success) {
          // Filter out the user's team
          const filteredTeams = data.data.filter(
            (team) => team.team.id !== userTeamId
          );
          setTeams(filteredTeams);
        }
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      }
    };

    if (open) {
      fetchLeaderboard();
      setSelectedTeam(null); // Reset selection when dialog opens
    }
  }, [open, userTeamId, token]);

  // Timer logic
  useEffect(() => {
    let interval;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsTimerActive(false); // Stop the timer
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [isTimerActive]);

  // Format time for countdown display
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // Handle power-up confirmation and API call
  const handleConfirm = async () => {
    if (!selectedTeam) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://snatch-ieeecs-backend.vercel.app/powerups/use",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            powerUp: "freeze", // Sending freeze as power-up name
            id: selectedTeam, // Sending selected team's ID
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        console.log(`Freeze applied to team ${selectedTeam}`);
        setIsTimerActive(true); // Start the timer
        onConfirm(); // Notify parent component
        onOpenChange(false); // Close dialog
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="rounded-2xl">
      <DialogContent className="bg-[#01bffe] rounded-2xl p-6 w-full max-w-md">
        {/* Dialog Title */}
        <DialogTitle className="sr-only">Freeze Power-Up</DialogTitle>

        <div className="flex flex-col items-center">
          {/* Icon */}
          <Image src="/freeze2.png" alt="Freeze Icon" width={100} height={100} />

          {/* Title */}
          <h2 className="text-white text-4xl font-bold mt-4">FREEZE</h2>

          {/* Description */}
          <p className="text-white text-center mt-2 text-sm">
            THIS POWER-UP CAN BE USED TO FREEZE ANY TEAM FOR 5 MINUTES.
            <br />
            CAN BE USED ONLY ONCE!
          </p>

          {/* Timer Display */}
          {isTimerActive && (
            <div className="mt-6 flex items-center justify-center bg-black/70 p-4 rounded-full text-white text-2xl font-bold">
              <div className="mr-2">Time Remaining:</div>
              <div>{formatTime(timer)}</div>
            </div>
          )}

          {/* Table of Other Teams */}
          <div className="mt-6 w-full bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-center mb-2">
              Select a team to freeze:
            </h3>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="font-bold">#</TableCell>
                  <TableCell className="font-bold">Team Name</TableCell>
                  <TableCell className="font-bold text-right">Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teams.length > 0 ? (
                  teams.map((team, index) => (
                    <TableRow
                      key={team.team.id}
                      onClick={() => setSelectedTeam(team.team.id)}
                      className={`cursor-pointer transition duration-300 ${
                        selectedTeam === team.team.id
                          ? "bg-blue-200/70 border-2 border-blue-500 shadow-lg scale-105"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{team.team.name}</TableCell>
                      <TableCell className="text-right">{team.score}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      No teams available to freeze.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-300 text-center text-lg font-semibold mt-4">
              {error}
            </p>
          )}

          {/* Buttons */}
          <div className="flex w-full justify-between mt-6">
            <Button
              variant="destructive"
              className="px-6 py-2 text-lg"
              onClick={() => onOpenChange(false)}
            >
              CANCEL
            </Button>
            <Button
              variant="secondary"
              className="px-6 py-2 text-lg"
              onClick={handleConfirm}
              disabled={!selectedTeam || isTimerActive || loading}
            >
              {loading
                ? "Applying..."
                : isTimerActive
                ? "Power-Up Active"
                : "CONFIRM"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FreezeDialog;
