"use client";
import { Team, TeamStatusTypes } from "@/graphql/generated/graphql";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import React from "react";

type TeamCardProps = {
  team: Team;
  teamIndex: number;
};

const statusBadgeVariants: Record<TeamStatusTypes, string> = {
  [TeamStatusTypes.Bye]: "bg-gray-500 text-white",
  [TeamStatusTypes.ComingUp]: "bg-blue-500 text-white",
  [TeamStatusTypes.Disqualified]: "bg-orange-600 text-white",
  [TeamStatusTypes.Eliminated]: "bg-red-600 text-white",
  [TeamStatusTypes.Forfeited]: "bg-red-700 text-white",
  [TeamStatusTypes.Idle]: "bg-slate-400 text-gray-900",
  [TeamStatusTypes.NotAssigned]: "bg-gray-600 text-white",
  [TeamStatusTypes.Playing]: "bg-emerald-600 text-white",
  [TeamStatusTypes.Registered]: "bg-green-600 text-white",
  [TeamStatusTypes.WaitingList]: "bg-yellow-600 text-gray-900",
  [TeamStatusTypes.Withdrawn]: "bg-zinc-600 text-white",
};

export default function TeamCard({ team, teamIndex }: TeamCardProps) {
  return (
    <Card
      className="w-full rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-border bg-background"
      key={teamIndex}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-lg font-bold text-foreground">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {team.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="truncate">{team.name}</span>
          {team.statusInTournament && (
            <Badge
              title={team.statusInTournament}
              className={`ml-auto text-xs px-2 py-1 rounded-md ${statusBadgeVariants[team.statusInTournament]}`}
            >
              {team.statusInTournament
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-1">Members</h4>
          <ScrollArea className="h-[150px] w-full rounded-md border border-border bg-muted/20">
            <div className="p-2 space-y-2">
              {team?.users?.length ? (
                team.users.map((user, userIndex) => (
                  <div key={userIndex} className="flex items-center space-x-3">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-foreground truncate">{user.name}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic">No members in this team.</p>
              )}
            </div>
          </ScrollArea>
        </div>

        <Separator />

        <div className="text-xs text-muted-foreground">
          Team ID: <span className="font-mono">{team.id}</span>
        </div>
      </CardContent>
    </Card>
  );
}
