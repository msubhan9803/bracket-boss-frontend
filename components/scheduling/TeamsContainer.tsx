"use client";
import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { TeamType } from "@/graphql/generated/graphql";
import PlayersContainer from "./PlayersContainer";

type TeamsContainerProps = {
    matchIndex: number;
    teams: TeamType[];
};

export default function TeamsContainer({ matchIndex, teams }: TeamsContainerProps) {
    return (
        <Droppable droppableId={`droppable-teams-${matchIndex}`} type="TEAM" direction="vertical">
            {(providedTeams) => (
                <div ref={providedTeams.innerRef} {...providedTeams.droppableProps}>
                    {teams.map((team, teamIndex) => (
                        <Draggable
                            key={`match-${matchIndex}-team-${teamIndex}`}
                            draggableId={`match-${matchIndex}-team-${teamIndex}`}
                            index={teamIndex}
                        >
                            {(teamProvided) => (
                                <div
                                    className="border p-2 rounded mb-2"
                                    ref={teamProvided.innerRef}
                                    {...teamProvided.draggableProps}
                                    {...teamProvided.dragHandleProps}
                                >
                                    <h4 className="font-semibold">{team.name}</h4>
                                    <PlayersContainer matchIndex={matchIndex} teamIndex={teamIndex} players={team.players} />
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {providedTeams.placeholder}
                </div>
            )}
        </Droppable>
    );
}
