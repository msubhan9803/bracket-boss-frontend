"use client";
import React from "react";

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
        <div
            className="bg-gray-50 p-2 rounded dark:bg-gray-800"
        >
            {players.map((player, playerIndex) => (
                <div className="border rounded p-1 mb-1 bg-white dark:bg-gray-700 dark:border-gray-600" key={`player-${matchIndex}-${teamIndex}-${playerIndex}`}>
                    {player.name}
                </div>
            ))}
        </div>
    );
}
