import { useCallback } from "react";
import { DropResult } from "@hello-pangea/dnd";
import { MatchType, TeamType } from "@/graphql/generated/graphql";
import { CreatedMatchType } from "@/hooks/schedule/useGetScheduleOfTournament";

type Match = MatchType | CreatedMatchType;

type UseScheduleDragAndDropParams = {
    matches: Match[];
    setMatches: React.Dispatch<React.SetStateAction<Match[]>>;
    activeTab: "matches" | "teams";
    allTeams: TeamType[];
};

function reorderArray<T>(list: T[], startIndex: number, endIndex: number): T[] {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
}

export default function useScheduleDragAndDrop({ matches, setMatches, activeTab, allTeams }: UseScheduleDragAndDropParams) {
    const onDragEnd = useCallback((result: DropResult) => {
        const { destination, source, type } = result;

        if (!destination) return;

        /**
         * No movement
         */
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        /**
         * Below logic applies only if activeTab is "matches"
         */
        if (activeTab === "matches") {
            let newMatches = Array.from(matches);

            if (type === "MATCH") {
                // Reorder matches
                newMatches = reorderArray(newMatches, source.index, destination.index);
                setMatches(newMatches);
                return;
            }

            if (type === "TEAM") {
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

                setMatches(newMatches);
                return;
            }

            if (type === "PLAYER") {
                const parseDroppableId = (id: string) => {
                    const parts = id.split("-");
                    return {
                        matchIndex: parseInt(parts[2]),
                        teamIndex: parseInt(parts[3])
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
                    // reorder players within the same team
                    sourcePlayers.splice(destination.index, 0, removedPlayer);
                    sourceTeam.players = sourcePlayers as any;
                    sourceMatch.teams[sTeamI] = sourceTeam;
                    newMatches[sMatchI] = sourceMatch;
                } else {
                    // moving player to a different team
                    const destPlayers = Array.from(destTeam.players as any);
                    destPlayers.splice(destination.index, 0, removedPlayer);

                    sourceTeam.players = sourcePlayers as any;
                    destTeam.players = destPlayers as any;

                    sourceMatch.teams[sTeamI] = sourceTeam;
                    destMatch.teams[dTeamI] = destTeam;

                    newMatches[sMatchI] = sourceMatch;
                    newMatches[dMatchI] = destMatch;
                }

                setMatches(newMatches);
                return;
            }

        }

        /**
         * Below logic applies only if activeTab is "teams" and type is "GLOBAL_PLAYERS"
         */
        if (activeTab === "teams" && type === "GLOBAL_PLAYERS") {
            const parseDroppableId = (id: string) => {
                const parts = id.split("-");
                return {
                    teamIndex: parseInt(parts[3])
                };
            };

            const { teamIndex: sTeamI } = parseDroppableId(source.droppableId);
            const { teamIndex: dTeamI } = parseDroppableId(destination.droppableId);

            // Make a shallow copy of allTeams so we can safely modify the data
            let newTeams = [...allTeams];

            const sTeam = { ...newTeams[sTeamI] };
            const sPlayers = Array.from(sTeam.players as any);

            // Remove the player from the source team
            const [removedPlayer] = sPlayers.splice(source.index, 1);

            if (sTeamI === dTeamI) {
                // Reorder player within the same team
                sPlayers.splice(destination.index, 0, removedPlayer);
                sTeam.players = sPlayers as any;
                newTeams[sTeamI] = sTeam;
            } else {
                // Move player to a different team
                const dTeam = { ...newTeams[dTeamI] };
                const dPlayers = Array.from(dTeam.players as any);
                dPlayers.splice(destination.index, 0, removedPlayer);

                sTeam.players = sPlayers as any;
                dTeam.players = dPlayers as any;

                newTeams[sTeamI] = sTeam;
                newTeams[dTeamI] = dTeam;
            }

            let updatedMatches = [...matches];
            /**
             * Update the teams in matches if they have been updated
             */
            for (let index = 0; index < newTeams.length; index++) {
                const team = allTeams[index];

                for (let i = 0; i < updatedMatches.length; i++) {
                    const match = updatedMatches[i] as MatchType;
                    
                    const matchTeamIndex = match.teams.findIndex((t) => t.name === team.name);

                    if (matchTeamIndex > -1) {
                        const updatedMatch = { ...match } as MatchType;
                        updatedMatch.teams[matchTeamIndex] = newTeams[index];
                        
                        updatedMatches[i] = updatedMatch;
                    }
                }
            }

            setMatches(updatedMatches);

            return;
        }
    }, [matches, setMatches, activeTab, allTeams]);

    return { onDragEnd };
}
