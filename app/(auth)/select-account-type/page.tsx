import React from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import { FaRegBuilding, FaUser } from "react-icons/fa";
import SelectableCard from "./_components/SelectableCard";

export default function SelectAccountType() {
  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Select your account type</h1>
      </div>

      <RadioGroup defaultValue="club" className="grid grid-cols-2 gap-4">
        <SelectableCard
          id="club"
          value="club"
          label="Club"
          icon={<FaRegBuilding className="h-6 w-6" />}
        />
        <SelectableCard
          id="player"
          value="player"
          label="Player"
          icon={<FaUser className="h-6 w-6" />}
        />
      </RadioGroup>
    </div>
  );
}
