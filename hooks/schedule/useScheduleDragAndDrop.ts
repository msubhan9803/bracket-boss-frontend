import { useCallback } from "react";
import { DropResult } from "@hello-pangea/dnd";
import { MatchType } from "@/graphql/generated/graphql";
import { CreatedMatchType } from "@/hooks/schedule/useGetScheduleOfTournament";

type Match = MatchType | CreatedMatchType;

type UseScheduleDragAndDropParams = {
    matches: Match[];
    setMatches: React.Dispatch<React.SetStateAction<Match[]>>;
};

function reorderMatches(matches: Match[], sourceIndex: number, destinationIndex: number) {
    const newMatches = Array.from(matches);
    const [removed] = newMatches.splice(sourceIndex, 1);
    newMatches.splice(destinationIndex, 0, removed);
    return newMatches;
}

function reorderTeams(
    matches: Match[],
    source: { droppableId: string; index: number },
    destination: { droppableId: string; index: number }
) {
    const newMatches = Array.from(matches);

    const sourceMatchIndex = parseInt(source.droppableId.split("-")[2]);
    const destMatchIndex = parseInt(destination.droppableId.split("-")[2]);

    const sourceMatch = { ...newMatches[sourceMatchIndex] } as MatchType;
    const destMatch = { ...newMatches[destMatchIndex] } as MatchType;

    const sourceTeams = Array.from(sourceMatch.teams);
    const [removedTeam] = sourceTeams.splice(source.index, 1);

    if (sourceMatchIndex === destMatchIndex) {
        sourceTeams.splice(destination.index, 0, removedTeam);
        sourceMatch.teams = sourceTeams;
        newMatches[sourceMatchIndex] = sourceMatch;
    } else {
        const destTeams = Array.from(destMatch.teams);
        destTeams.splice(destination.index, 0, removedTeam);
        sourceMatch.teams = sourceTeams;
        destMatch.teams = destTeams;
        newMatches[sourceMatchIndex] = sourceMatch;
        newMatches[destMatchIndex] = destMatch;
    }

    return newMatches;
}

function reorderPlayers(
    matches: Match[],
    source: { droppableId: string; index: number },
    destination: { droppableId: string; index: number }
) {
    const newMatches = Array.from(matches);

    const parseDroppableId = (id: string) => {
        const parts = id.split("-");
        return {
            matchIndex: parseInt(parts[2]),
            teamIndex: parseInt(parts[3]),
        };
    };

    const { matchIndex: sMatchI, teamIndex: sTeamI } = parseDroppableId(source.droppableId);
    const { matchIndex: dMatchI, teamIndex: dTeamI } = parseDroppableId(destination.droppableId);

    const sourceMatch = { ...newMatches[sMatchI] } as MatchType;
    const destMatch = { ...newMatches[dMatchI] } as MatchType;
    const sourceTeam = { ...sourceMatch.teams[sTeamI] };
    const destTeam = { ...destMatch.teams[dTeamI] };

    const sourcePlayers = Array.from(sourceTeam.players as any);
    const [removedPlayer] = sourcePlayers.splice(source.index, 1);

    if (sMatchI === dMatchI && sTeamI === dTeamI) {
        // Reorder players within the same team
        sourcePlayers.splice(destination.index, 0, removedPlayer);
        sourceTeam.players = sourcePlayers as any;
        sourceMatch.teams[sTeamI] = sourceTeam;
        newMatches[sMatchI] = sourceMatch;
    } else {
        // Moving player to a different team
        const destPlayers = Array.from(destTeam.players as any);
        destPlayers.splice(destination.index, 0, removedPlayer);

        sourceTeam.players = sourcePlayers as any;
        destTeam.players = destPlayers as any;

        sourceMatch.teams[sTeamI] = sourceTeam;
        destMatch.teams[dTeamI] = destTeam;

        newMatches[sMatchI] = sourceMatch;
        newMatches[dMatchI] = destMatch;
    }

    return newMatches;
}

export default function useScheduleDragAndDrop({ matches, setMatches }: UseScheduleDragAndDropParams) {
    const onDragEnd = useCallback((result: DropResult) => {
        const { destination, source, type } = result;
        if (!destination) return;

        // If the location didn't change
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        let newMatches = Array.from(matches);

        switch (type) {
            case "MATCH":
                newMatches = reorderMatches(newMatches, source.index, destination.index);
                setMatches(newMatches);
                break;

            case "TEAM":
                newMatches = reorderTeams(newMatches, source, destination);
                setMatches(newMatches);
                break;

            case "PLAYER":
                newMatches = reorderPlayers(newMatches, source, destination);
                setMatches(newMatches);
                break;

            default:
                break;
        }
    }, [matches, setMatches]);

    return { onDragEnd };
}
