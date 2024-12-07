"use client";
import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { MatchType } from "@/graphql/generated/graphql";
import MatchCard from "./MatchCard";

type MatchesContainerProps = {
    matches: MatchType[];
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
