"use client";
import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import MatchCard from "./MatchCard";
import { CreatedMatchType } from "@/hooks/schedule/useGetScheduleOfTournament";

type MatchesContainerProps = {
    matches: CreatedMatchType[];
};

export default function MatchesContainer({ matches }: MatchesContainerProps) {
    return (
        <Droppable droppableId="droppable-matches" direction="horizontal" type="MATCH">
            {(provided) => (
                <div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-12"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {matches.map((match, matchIndex) => (
                        <Draggable
                            key={`match-${matchIndex}`}
                            draggableId={`match-${matchIndex}`}
                            index={matchIndex}
                        >
                            {(matchProvided) => (
                                <div
                                    ref={matchProvided.innerRef}
                                    {...matchProvided.draggableProps}
                                    {...matchProvided.dragHandleProps}
                                >
                                    <MatchCard match={match} matchIndex={matchIndex} />
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
