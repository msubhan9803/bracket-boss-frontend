import { MatchType } from "@/graphql/generated/graphql";
import React from "react";
import TeamCard from "./TeamCard";

type Props = {
  index: number;
  match: MatchType;
};

export default function MatchCard({ match, index }: Props) {
  return (
    <div className="flex flex-col text-center bg-muted/50 rounded-lg border border-secondary hover:border-primary shadow-md p-4">
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-primary">
        Match {index + 1}
      </h2>

      <div className="w-full flex justify-between gap-1 items-center mt-4">
        {match.teams.map((team, index) => (
          <React.Fragment key={`team-${index}`}>
            <TeamCard team={team} index={index} />

            {index === 0 && (
              <div className="col-span-1 text-center text-md font-bold">VS</div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
