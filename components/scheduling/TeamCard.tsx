import { TeamType } from "@/graphql/generated/graphql";
import React from "react";
import PlayerCard from "./PlayerCard";

type Props = {
  team: TeamType;
};

export default function TeamCard({ team }: Props) {
  return (
    <div className="col-span-3 rounded-lg border border-primary shadow-md p-4 my-8">
      <h2 className="text-lg md:text-xl font-bold">{team.name}</h2>

      {team.players.map((player, index) => (
        <PlayerCard key={`player-${index}`} player={player} />
      ))}
    </div>
  );
}
