import { MatchType } from "@/graphql/generated/graphql";
import React from "react";
import TeamCard from "./TeamCard";

type Props = {
  match: MatchType;
};

export default function MatchCard({ match }: Props) {
  console.log("⚽️⚽️⚽️⚽️⚽️ Match: ", match);

  return (
    <div className="flex flex-col text-center rounded-lg border border-primary shadow-md p-4 my-16">
      <h2 className="text-xl md:text-2xl font-bold">
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {match.name}
        </span>
      </h2>

      <div className="w-full grid grid-cols-7 gap-4 items-center">
        {match.teams.map((team, index) => (
          <React.Fragment key={`team-${index}`}>
            <TeamCard team={team} />
            {index === 0 && (
              <div className="col-span-1 text-center text-xl font-bold">Vs</div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
