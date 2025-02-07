import React from "react";
import { Shield } from "lucide-react";
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

const ShieldDialog = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#c68e00] max-w-md rounded-lg">
        <DialogHeader className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-[#c68e00] rounded-lg p-8">
            <Image
              src="/shield1.png"
              width={200}
              height={200}
              alt="shield image"
            />
          </div>
          <DialogTitle className="text-2xl font-bold text-white text-center">
            SHIELD
          </DialogTitle>
          <DialogDescription className="text-white text-center text-base">
            THIS POWER-UP CAN BE USED TO SAVE YOURSELF FROM ANYONE'S ATTACK FOR
            5 MINUTES. CAN BE USED ONLY ONCE!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex mx-auto  mt-4">
          <Button
            variant="destructive"
            className="bg-red-700 hover:bg-red-800 text-white px-8"
            onClick={() => onOpenChange(false)}
          >
            CANCEL
          </Button>
          <Button
            className="bg-white text-amber-600 hover:bg-gray-100 px-8"
            onClick={() => onOpenChange(false)}
          >
            CONFIRM
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShieldDialog;
