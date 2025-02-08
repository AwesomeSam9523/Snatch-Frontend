"use client";
import { useState } from "react";
import { FaTrash, FaBan, FaPlus } from "react-icons/fa";
import Navbar from "../../madeComponents/Navbar";
import Footer from "../../madeComponents/Footer";
import Pool from "../../madeComponents/Pool";
import { post } from "../../service"; 

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("rounds");
  const [activeSubTab, setActiveSubTab] = useState("teams");
  const [selectedRound, setSelectedRound] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [newMembers, setNewMembers] = useState(["", "", "", ""]);
  const [teams, setTeams] = useState([]); 

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
      round: selectedRound,
    };

    try {
      const response = await post("/admin/team/create", newTeam);

      if (response.success) {
        alert(`Team "${response.data.username}" added successfully!\nPassword: ${response.data.password}`);
        
        setTeams((prev) => [
          ...prev,
          { 
            id: response.data.id, 
            username: response.data.username,
            password: response.data.password,
            round: selectedRound,
          },
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

 
  const handleDeleteTeam = async (teamId) => {
    try {
      const response = await post("/admin/team/delete", { id: teamId });

      if (response.success) {
        
        setTeams((prevTeams) => prevTeams.filter((team) => team.id !== teamId));
        alert("Team deleted successfully!");
      } else {
        alert(response.message || "Failed to delete team.");
      }
    } catch (error) {
      console.error("Error deleting team:", error);
      alert("Error deleting team. Please try again.");
    }
  };

  
  const handleDisqualifyTeam = async (teamId) => {
    try {
      const response = await post("/admin/team/eliminate", { id: teamId });

      if (response.success) {
        
        setTeams((prevTeams) =>
          prevTeams.map((team) =>
            team.id === teamId ? { ...team, disqualified: true } : team
          )
        );
        alert("Team disqualified successfully!");
      } else {
        alert(response.message || "Failed to disqualify team.");
      }
    } catch (error) {
      console.error("Error disqualifying team:", error);
      alert("Error disqualifying team. Please try again.");
    }
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
          <div className="flex justify-between mx-10 space-x-4 mb-4 rounded-full border border-gray p-4 ">
            {[1, 2, 3].map((round) => (
              <div
                key={round}
                className={`font-Hanson px-40 py-3 text-xl rounded-tl-[28.03px] rounded-tr-[28.03px] rounded-bl-[28.03px] rounded-br-[28.03px] border-t-[0.7px] opacity-100 shadow-md font-bold text-white transition ${
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
              teams={teams.filter((team) => team.round === selectedRound)} // Filter teams by round
            />
          )}
        </div>
      )}

      {activeTab === "manage" && (
        <div className="m-4 bg-white p-4 shadow-md">
          {/* Sub-tabs for Manage section */}
          <div className=" text-2xl flex p-4 rounded-full border border-gray justify-center space-x-4 mx-20 mb-4">
            <button
              className={`font-Hanson px-40 py-3 rounded-tl-[28.03px] rounded-tr-[28.03px] rounded-bl-[28.03px] rounded-br-[28.03px] border-t-[0.7px]  opacity-100 ${
                activeSubTab === "teams" ? "bg-[#03941B] text-white font-semibold" : "bg-gray-200 text-black"
              }`}
              onClick={() => setActiveSubTab("teams")}
            >
              Teams
            </button>
            <button
              className={ ` font-Hanson px-40 py-3 rounded-tl-[28.03px] rounded-tr-[28.03px] rounded-bl-[28.03px] rounded-br-[28.03px] border-t-[0.7px]  opacity-100 ${
                activeSubTab === "edit" ? "bg-[#03941B] text-white font-semibold" : "bg-gray-200 text-black"
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
                    <span>{team.username}</span>
                    
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
                      <span>{team.username}</span>
                    </span>
                    <div className="space-x-3">
                    <button
  className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full"
  onClick={() => handleDeleteTeam(team.id)}
>
  Delete
</button>
<button
  className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full "
  onClick={() => handleDisqualifyTeam(team.id)}
>
  Disqualify
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
            <h2 className="text-xl font-semibold text-green-700 mb-4">Add New Team</h2>
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
