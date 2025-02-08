import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ReboundDialog = ({ open, onOpenChange, onConfirm }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#c60000] max-w-md rounded-lg">
        <DialogHeader className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-[#c60000] rounded-lg p-8">
            <Image
              src="/rebound.png"
              width={200}
              height={200}
              alt="Rebound Power-Up"
            />
          </div>
          <DialogTitle className="text-2xl font-bold text-white text-center">
            REBOUND
          </DialogTitle>
          <DialogDescription className="text-white text-center text-base">
            THIS POWER-UP CAN REFLECT AN ATTACK BACK TO THE SENDER.<br />
            CAN BE USED ONLY ONCE!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex mx-auto mt-4">
          <Button
            variant="destructive"
            className="bg-red-700 hover:bg-red-500 text-white px-8"
            onClick={() => onOpenChange(false)}
          >
            CANCEL
          </Button>
          <Button
            className="bg-white text-red-600 hover:bg-gray-100 px-8"
            onClick={() => {
              onConfirm(); // Start the timer when confirmed
              onOpenChange(false); // Close the dialog
            }}
          >
            CONFIRM
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReboundDialog;
