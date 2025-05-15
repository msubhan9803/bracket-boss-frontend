"use client";
import PageTitle from "@/components/PageTitle";
import { TournamentStatusBadge } from "@/components/shared/StatusBadge";
import { Tournament } from "@/graphql/generated/graphql";
import useSingleTournament from "@/hooks/tournament/useSingleTournament";
import { PageUrls } from "@/lib/app-types";
import moment from "moment";
import React, { useEffect, useState } from "react";

type Props = {
  tournamentDetails: Tournament;
};

export default function TournamentHeader({ tournamentDetails }: Props) {
  const [tournamentState, setTournamentState] = useState(tournamentDetails);
  const { tournament, refetchTournament } = useSingleTournament(tournamentDetails.id);

  useEffect(() => {
    if (tournament) {
      setTournamentState(tournament);
    }
  }, [tournament]);

  return (
    <PageTitle
      render={
        <div className="flex justify-between items-center my-4">
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">{tournamentState.name}</h1>
            <span className="text-muted dark:text-gray-400 text-gray-600">
              {moment(tournamentState.start_date).format("MMMM Do, YYYY")} -{" "}
              {moment(tournamentState.end_date).format("MMMM Do, YYYY")}
            </span>
          </div>
          <TournamentStatusBadge
            status={tournamentState?.status}
          />
        </div>
      }
      breadcrumbs={[
        {
          label: "Schedule Management",
          href: PageUrls.SCHEDULING_MANAGEMENT,
        },
        {
          label: "Team Management",
          href: "",
        },
      ]}
    />
  );
}
