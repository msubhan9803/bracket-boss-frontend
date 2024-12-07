"use client";
import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";

type PlayerType = {
    id: string;
    name: string;
}

type PlayersContainerProps = {
    matchIndex: number;
    teamIndex: number;
    players: PlayerType[];
};

export default function PlayersContainer({ matchIndex, teamIndex, players }: PlayersContainerProps) {
    return (
        <Droppable droppableId={`droppable-players-${matchIndex}-${teamIndex}`} type="PLAYER" direction="vertical">
            {(providedPlayers) => (
                <div ref={providedPlayers.innerRef} {...providedPlayers.droppableProps} className="bg-gray-50 p-2 rounded">
                    {players.map((player, playerIndex) => (
                        <Draggable
                            key={`match-${matchIndex}-team-${teamIndex}-player-${player.id}`}
                            draggableId={`match-${matchIndex}-team-${teamIndex}-player-${player.id}`}
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
                    {providedPlayers.placeholder}
                </div>
            )}
        </Droppable>
    );
}
