import { MatchType } from "@/graphql/generated/graphql";
import React from "react";

type Props = {
  player: number;
};

export default function PlayerCard({ player }: Props) {
  return (
    <div className="flex flex-col text-center rounded-lg border border-primary shadow-md p-4 my-8">
      <h4 className="text-xl md:text-2xl font-bold">Player {player}</h4>
    </div>
  );
}
