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
  [TeamStatusTypes.Bye]: "bg-gray-400 text-white",
  [TeamStatusTypes.ComingUp]: "bg-blue-400 text-white",
  [TeamStatusTypes.Disqualified]: "bg-orange-500 text-white",
  [TeamStatusTypes.Eliminated]: "bg-red-500 text-white",
  [TeamStatusTypes.Forfeited]: "bg-red-600 text-white",
  [TeamStatusTypes.Idle]: "bg-slate-300 text-gray-900",
  [TeamStatusTypes.NotAssigned]: "bg-green-500 text-white",
  [TeamStatusTypes.Playing]: "bg-emerald-500 text-white",
  [TeamStatusTypes.Registered]: "bg-purple-500 text-white",
  [TeamStatusTypes.WaitingList]: "bg-yellow-500 text-gray-900",
  [TeamStatusTypes.Withdrawn]: "bg-zinc-500 text-white",
};

export default function TeamCard({ team, teamIndex }: TeamCardProps) {
  return (
    <Card className="w-full shadow-md hover:shadow-lg transition-shadow duration-200" key={teamIndex}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">
              {team.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {team.name}
          {team.statusInTournament && (
            <Badge
              variant="secondary"
              className={statusBadgeVariants[team.statusInTournament]}
            >
              {team.statusInTournament.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <h4 className="font-semibold text-sm text-muted-foreground">Members</h4>
        <ScrollArea className="h-[150px] w-full rounded-md border">
          <div className="p-2 space-y-2">
            {team?.users?.map((user, userIndex) => (
              <div key={userIndex} className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{user.name}</span>
              </div>
            ))}
            {team?.users?.length === 0 && (
              <p className="text-sm text-muted-foreground italic">No members in this team.</p>
            )}
          </div>
        </ScrollArea>
        <Separator />
        <div className="text-xs text-muted-foreground">
          Team ID: <span className="font-mono">{team.id}</span>
        </div>
      </CardContent>
    </Card>
  );
}