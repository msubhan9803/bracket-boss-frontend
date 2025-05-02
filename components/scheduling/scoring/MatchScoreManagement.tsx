import React, { useEffect, useState } from "react";
import { Level, Pool, Round } from "@/graphql/generated/graphql";
import MatchCard from "../MatchCard";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import FilterScoringMatchesButton from "@/components/mutation-buttons/FilterScoringMatchesButton";

type Props = {
  tournamentId: string;
};

export default function MatchScoreManagement({ tournamentId }: Props) {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-primary">
        Match Score Management
      </h2>

      <div className="flex flex-wrap gap-4">
        <FilterScoringMatchesButton tournamentId={tournamentId} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* {matches?.length
          ? matches.map((match, index) => (
              <MatchCard key={match.id} match={match} matchIndex={index} />
            ))
          : selectedRound && (
              <p className="text-muted-foreground">
                No matches available for this round.
              </p>
            )} */}
      </div>
    </div>
  );
}
