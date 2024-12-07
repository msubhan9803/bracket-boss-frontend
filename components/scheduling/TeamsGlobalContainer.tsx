"use client";
import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { TeamType } from "@/graphql/generated/graphql";

type TeamsGlobalContainerProps = {
    teams: TeamType[];
};

export default function TeamsGlobalContainer({ teams }: TeamsGlobalContainerProps) {
    return (
        <Droppable droppableId="droppable-all-teams" direction="vertical" type="GLOBAL_TEAMS">
            {(provided) => (
                <div
                    className="p-4 bg-muted/50 rounded-lg border border-secondary hover:border-primary shadow-md"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    <h3 className="font-bold mb-4">All Teams</h3>
                    {teams.map((team, teamIndex) => (
                        <Draggable
                            key={`global-team-${teamIndex}`}
                            draggableId={`global-team-${teamIndex}`}
                            index={teamIndex}
                        >
                            {(teamProvided) => (
                                <div
                                    className="border p-2 rounded mb-4 bg-white"
                                    ref={teamProvided.innerRef}
                                    {...teamProvided.draggableProps}
                                    {...teamProvided.dragHandleProps}
                                >
                                    <h4 className="font-semibold mb-2">{team.name}</h4>
                                    {/* Players within a team */}
                                    <Droppable
                                        droppableId={`droppable-global-players-${teamIndex}`}
                                        direction="vertical"
                                        type="GLOBAL_PLAYERS"
                                    >
                                        {(playersProvided) => (
                                            <div
                                                ref={playersProvided.innerRef}
                                                {...playersProvided.droppableProps}
                                                className="bg-gray-50 p-2 rounded"
                                            >
                                                {team.players.map((player, playerIndex) => (
                                                    <Draggable
                                                        key={`global-team-${teamIndex}-player-${player.id}`}
                                                        draggableId={`global-team-${teamIndex}-player-${player.id}`}
                                                        index={playerIndex}
                                                    >
                                                        {(playerProvided) => (
                                                            <div
                                                                className="border rounded p-1 mb-1 bg-white"
                                                                ref={playerProvided.innerRef}
                                                                {...playerProvided.draggableProps}
                                                                {...playerProvided.dragHandleProps}
                                                            >
                                                                {player.name}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {playersProvided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}
