"use client";
import React from "react";
import { MatchType } from "@/graphql/generated/graphql";
import TeamsContainer from "./TeamsContainer";

type MatchCardProps = {
  match: MatchType;
  matchIndex: number;
};

export default function MatchCard({ match, matchIndex }: MatchCardProps) {
  return (
    <div className="p-4 bg-muted/50 rounded-lg border border-secondary hover:border-primary shadow-md">
      <h3 className="font-bold mb-2">Match {matchIndex + 1}</h3>
      <TeamsContainer matchIndex={matchIndex} teams={match.teams} />
    </div>
  );
}
