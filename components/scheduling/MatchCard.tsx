import { Droppable, Draggable } from "@hello-pangea/dnd";
import React from "react";
import { MatchType } from "@/graphql/generated/graphql";

type MatchCardProps = {
  match: MatchType;
  matchIndex: number;
};

export default function MatchCard({ match, matchIndex }: MatchCardProps) {
  return (
    <div className="p-4 bg-muted/50 rounded-lg border border-secondary hover:border-primary shadow-md">
      <h3 className="font-bold mb-2">Match {matchIndex + 1}</h3>
      {/* Teams Droppable */}
      <Droppable droppableId={`droppable-teams-${matchIndex}`} type="TEAM" direction="vertical">
        {(providedTeams: any) => (
          <div ref={providedTeams.innerRef} {...providedTeams.droppableProps}>
            {match.teams.map((team, teamIndex) => (
              <Draggable
                key={`match-${matchIndex}-team-${teamIndex}`}
                draggableId={`match-${matchIndex}-team-${teamIndex}`}
                index={teamIndex}
              >
                {(teamProvided: any) => (
                  <div
                    className="border p-2 rounded mb-2"
                    ref={teamProvided.innerRef}
                    {...teamProvided.draggableProps}
                    {...teamProvided.dragHandleProps}
                  >
                    <h4 className="font-semibold">{team.name}</h4>

                    {/* Players Droppable */}
                    <Droppable droppableId={`droppable-players-${matchIndex}-${teamIndex}`} type="PLAYER" direction="vertical">
                      {(providedPlayers) => (
                        <div ref={providedPlayers.innerRef} {...providedPlayers.droppableProps} className="bg-gray-50 p-2 rounded">
                          {team.players.map((player, playerIndex) => (
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
                  </div>
                )}
              </Draggable>
            ))}
            {providedTeams.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
