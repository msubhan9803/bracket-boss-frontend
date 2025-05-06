"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { graphqlRequestHandler } from "@/lib/graphql-client";
import { END_MATCH, END_MATCH_ROUND, START_MATCH, START_MATCH_ROUND, UPDATE_SCORE } from "@/graphql/mutations/match";
import { UpdateMatchScoreInputDto } from "@/graphql/generated/graphql";

export enum USE_MATCH_OPERATIONS {
  START_MATCH = "START_MATCH",
  UPDATE_SCORE = "UPDATE_SCORE",
  END_MATCH_ROUND = "END_MATCH_ROUND",
  END_MATCH = "END_MATCH",
}

export default function useMatchOperations() {
  const startTournamentMutation = useMutation({
    mutationKey: [USE_MATCH_OPERATIONS.START_MATCH],
    mutationFn: async (matchId: number) =>
      graphqlRequestHandler({
        query: START_MATCH,
        variables: { matchId },
      }),
    onSuccess: () => {
      toast.success("Match started successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateScoreMutation = useMutation({
    mutationKey: [USE_MATCH_OPERATIONS.UPDATE_SCORE],
    mutationFn: async (variables: UpdateMatchScoreInputDto) =>
      graphqlRequestHandler({
        query: UPDATE_SCORE,
        variables: { input: variables },
      }),
    onSuccess: () => {
      toast.success("Match Round score updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const endMatchRoundMutation = useMutation({
    mutationKey: [USE_MATCH_OPERATIONS.END_MATCH_ROUND],
    mutationFn: async (variables: { matchId: number, roundId: number }) =>
      graphqlRequestHandler({
        query: END_MATCH_ROUND,
        variables
      }),
    onSuccess: () => {
      toast.success("Match Round ended");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const startMatchRoundMutation = useMutation({
    mutationKey: [USE_MATCH_OPERATIONS.END_MATCH_ROUND],
    mutationFn: async (variables: { matchId: number, roundId: number }) =>
      graphqlRequestHandler({
        query: START_MATCH_ROUND,
        variables
      }),
    onSuccess: () => {
      toast.success("Match Round started");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const endMatchMutation = useMutation({
    mutationKey: [USE_MATCH_OPERATIONS.END_MATCH],
    mutationFn: async (variables: { matchId: number }) =>
      graphqlRequestHandler({
        query: END_MATCH,
        variables
      }),
    onSuccess: () => {
      toast.success("Match ended");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    startTournamentMutation,
    updateScoreMutation,
    endMatchRoundMutation,
    startMatchRoundMutation,
    endMatchMutation,
  };
}
