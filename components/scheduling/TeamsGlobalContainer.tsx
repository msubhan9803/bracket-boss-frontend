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
                    className="p-4 bg-muted/50 rounded-lg border border-secondary shadow-md"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    <h3 className="font-bold mb-4">All Teams</h3>
                    {teams.map((team, teamIndex) => (
                        <div
                            className="border p-2 rounded mb-4 bg-white dark:bg-muted/75 dark:border-gray-600"
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
                                        className="bg-gray-50 dark:bg-gray-800 dark:border-gray-600 p-2 rounded"
                                    >
                                        {team.players.map((player, playerIndex) => (
                                            <Draggable
                                                key={`global-team-${teamIndex}-player-${player.id}`}
                                                draggableId={`global-team-${teamIndex}-player-${player.id}`}
                                                index={playerIndex}
                                            >
                                                {(playerProvided) => (
                                                    <div
                                                        className="border rounded p-1 mb-1 bg-white dark:bg-gray-700 dark:border-gray-600"
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
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}
