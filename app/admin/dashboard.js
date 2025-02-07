"use client";
import { useState } from "react";
import { FaTrash, FaBan, FaPlus } from "react-icons/fa";
import Navbar from "../madeComponents/Navbar";
import Footer from "../madeComponents/Footer";
import Pool from "../madeComponents/Pool";
import "../../app/globals.css";
import { post } from "../service"; 


const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("rounds");
  const [activeSubTab, setActiveSubTab] = useState("teams");
  const [selectedRound, setSelectedRound] = useState(null);

  // Mock data
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "Team A",
      avatar: "/avatars/avatar1.png",
      round: 1,
      pool: 1,
      members: ["Alice", "Bob", "Charlie", "Dave"],
      disqualified: false,
    },
    {
      id: 2,
      name: "Team B",
      avatar: "/avatars/avatar1.png",
      round: 1,
      pool: 1,
      members: ["Eve", "Frank", "Grace", "Hank"],
      disqualified: false,
    },
    {
      id: 3,
      name: "Team C",
      avatar: "/avatars/avatar1.png",
      round: 2,
      pool: 1,
      members: ["Ivy", "Jack", "Ken", "Liam"],
      disqualified: false,
    },
    {
      id: 4,
      name: "Team D",
      avatar: "/avatars/avatar1.png",
      round: 3,
      pool: 1,
      members: ["Mia", "Noah", "Olivia", "Paul"],
      disqualified: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [newMembers, setNewMembers] = useState(["", "", "", ""]);
  const [showOverlay, setShowOverlay] = useState(false);
  const handleCancel = () => {
    setShowOverlay(false);
  };

  const handleConfirm = () => {
    if (actionType === "delete") {
      console.log(`Team ${teamName} deleted`);
    } else if (actionType === "disqualify") {
      console.log(`Team ${teamName} disqualified`);
    }
    setShowOverlay(false);
  };

  const [selectedTeamId, setSelectedTeamId] = useState(null);

  const handleRoundClick = (round) => {
    setSelectedRound(selectedRound === round ? null : round);
  };

  const handleAddTeam = async () => {
    if (!newTeamName.trim() || newMembers.some((member) => !member.trim())) {
      alert("Please enter a valid team name and all members.");
      return;
    }
  
    const newTeam = {
      username: newTeamName,
      member1: newMembers[0] || "",
      member2: newMembers[1] || "",
      member3: newMembers[2] || "",
      member4: newMembers[3] || "",
    };
  
    try {
      const response = await post("/admin/team/create", newTeam); 
  
      if (response.success) {
        alert(
          `Team "${response.data.username}" added successfully!\nPassword: ${response.data.password}`
        ); 
  
        setTeams((prev) => [
          ...prev,
          { username: response.data.username, password: response.data.password },
        ]); 
  
        setNewTeamName("");
        setNewMembers(["", "", "", ""]); 
        setShowForm(false);
      } else {
        alert(response.message || "Failed to add team.");
      }
    } catch (error) {
      alert("Error adding team. Please try again.");
      console.error("Add team error:", error);
    }
  };
  

  const handleDeleteTeam = (teamId) => {
    setTeams(teams.filter((team) => team.id !== teamId));
    setShowDeleteModal(false);
  };

  const handleDisqualifyTeam = (teamId) => {
    setTeams(
      teams.map((team) =>
        team.id === teamId ? { ...team, disqualified: true } : team
      )
    );
    setShowDisqualifyModal(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="my-8 flex justify-between mx-40 space-x-4 mb-8">
        <span
          className={`font-Hanson cursor-pointer text-5xl font-bold ${
            activeTab === "rounds" ? "text-[#3F3F3F]" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("rounds")}
        >
          Rounds
        </span>
        <span
          className={`font-Hanson cursor-pointer text-5xl font-bold ${
            activeTab === "manage" ? "text-[#3F3F3F]" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("manage")}
        >
          Manage
        </span>
      </div>

      {activeTab === "rounds" && (
        <div className="space-y-6">
          {/* Round Selection */}
          <div className="flex justify-between mx-10 space-x-4 mb-4">
            {[1, 2, 3].map((round) => (
              <div
                key={round}
                className={`font-Hanson px-40 py-3 text-xl rounded-tl-[28.03px] rounded-tr-[28.03px] rounded-bl-[28.03px] rounded-br-[28.03px] border-t-[0.7px] border-gray-500 opacity-100 shadow-md font-bold text-white transition ${
                  selectedRound === round ? "bg-[#03941B]" : "bg-gray-300"
                }`}
                onClick={() => handleRoundClick(round)}
              >
                Round #{round}
              </div>
            ))}
          </div>

          {/* Display teams in the selected round */}
          {selectedRound && (
            <Pool
              teams={teams.filter((team) => team.round === selectedRound)}
            />
          )}
        </div>
      )}

      {activeTab === "manage" && (
        <div className="m-4 bg-white p-4 rounded-lg shadow-md">
          {/* Sub-tabs for Manage section */}
          <div
            className=" text-2xl flex justify-center
           space-x-4 mx-20 mb-4"
          >
            <button
              className={`px-40 py-3 rounded-tl-[28.03px] rounded-tr-[28.03px] rounded-bl-[28.03px] rounded-br-[28.03px] border-t-[0.7px] border-gray-500 opacity-100   ${
                activeSubTab === "teams"
                  ? "bg-[#03941B] text-white font-semibold"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => setActiveSubTab("teams")}
            >
              Teams
            </button>
            <button
              className={`px-40 py-3 rounded-tl-[28.03px] rounded-tr-[28.03px] rounded-bl-[28.03px] rounded-br-[28.03px] border-t-[0.7px] border-gray-500 opacity-100 ${
                activeSubTab === "edit"
                  ? "bg-[#03941B] text-white font-semibold"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => setActiveSubTab("edit")}
            >
              Edit
            </button>
          </div>

          {/* Manage Tab Content */}
          {activeSubTab === "teams" && (
            <div>
              <button
                className="mb-4 px-4 py-2 bg-[#03941B] text-white rounded-lg flex items-center space-x-2"
                onClick={() => setShowForm(true)}
              >
                <FaPlus />
                <span className="bg-[#03941B]">Add Team</span>
              </button>

              <ul className="space-y-2">
                {teams.map((team) => (
                  <li
                    key={team.id}
                    className="flex justify-between items-center p-2 border-b"
                  >
                    <span className="flex justify-center space-x-2">
                      {team.avatar.startsWith("/") ? (
                        <img
                          src={team.avatar}
                          alt={team.name}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <span className="text-3xl">{team.avatar}</span>
                      )}
                      <span>{team.name}</span>
                      <span className=" ">#Pool{team.pool}</span>
                    </span>
                    <div className="space-x-3">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          setSelectedTeamId(team.id);
                          setShowDeleteModal(true);
                        }}
                      ></button>
                      <button
                        className="text-yellow-500 hover:text-yellow-700"
                        onClick={() => {
                          setSelectedTeamId(team.id);
                          setShowDisqualifyModal(true);
                        }}
                      ></button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeSubTab === "edit" && (
            <div>
              <ul className="space-y-2">
                {teams.map((team) => (
                  <li
                    key={team.id}
                    className="flex justify-between items-center p-2 border-b"
                  >
                    <span className="flex items-center space-x-2">
                      {team.avatar.startsWith("/") ? (
                        <img
                          src={team.avatar}
                          alt={team.name}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <span className="text-3xl">{team.avatar}</span>
                      )}
                      <span>{team.name}</span>
                    </span>
                    <div className="space-x-3">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          setSelectedTeamId(team.id);
                          sh(true);
                        }}
                      >
                        <FaTrash />
                      </button>
                      <button
                        className="text-yellow-500 hover:text-yellow-700"
                        onClick={() => {
                          setSelectedTeamId(team.id);
                          setShowDisqualifyModal(true);
                        }}
                      >
                        <FaBan />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Add Team Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-green-700 mb-4">
              Add New Team
            </h2>
            <input
              type="text"
              placeholder="Team Name"
              className="w-full p-2 border rounded mb-2"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
            />
            {newMembers.map((member, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Member ${index + 1}`}
                className="w-full p-2 border rounded mb-2"
                value={member}
                onChange={(e) =>
                  setNewMembers((prev) =>
                    prev.map((m, i) => (i === index ? e.target.value : m))
                  )
                }
              />
            ))}
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={handleAddTeam}
              >
                Add Team
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AdminPanel;
