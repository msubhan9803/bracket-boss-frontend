import React from "react";
import { TeamType } from "@/graphql/generated/graphql";
import { InitialsAvatar } from "../ui/avatar";

type Props = {
  index: number;
  team: TeamType;
};

export default function TeamCard({ index, team }: Props) {
  const isEvenIndex = index % 2 === 0;

  return (
    <div className="col-span-3">
      <div
        className={`flex items-center ${
          isEvenIndex ? "justify-start" : "justify-end"
        } gap-x-2`}
      >
        {isEvenIndex ? (
          <>
            <InitialsAvatar name={team.name} className="text-xs w-8 h-8" />
            <h2 className="text-lg md:text-xl font-bold">{team.name}</h2>
          </>
        ) : (
          <>
            <h2 className="text-lg md:text-xl font-bold">{team.name}</h2>
            <InitialsAvatar name={team.name} className="text-xs w-8 h-8" />
          </>
        )}
      </div>

      <div className="mt-4">
        {team.players.map((player, index) => (
          <div key={`player-${index}`} className="flex flex-col text-start">
            <h4 className="text-sm font-normal">{player.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
