import React from "react";

const ConfirmationOverlay = ({ showOverlay, actionType, teamName, onCancel, onConfirm }) => {
  if (!showOverlay) return null; 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">
          {actionType === "delete" ? "Delete " : "Disqualify "}
        
        </h3>
        <p className="mb-4 text-black">Are you sure you want to {actionType} {teamName}?</p>
        <div className="flex flex-row justify-center space-x-4">
  <button
    className="bg-gray-300 px-4 py-2 rounded-lg"
    onClick={onCancel}
  >
    Cancel
  </button>
  <button
    className={`px-4 py-2 rounded-lg ${actionType === "delete" ? "bg-red-600 text-white" : "bg-yellow-600 text-white"}`}
    onClick={onConfirm}
  >
    {actionType === "delete" ? "Delete" : "Disqualify"}
  </button>
</div>

      </div>
    </div>
  );
};

export default ConfirmationOverlay;
