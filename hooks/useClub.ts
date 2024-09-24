"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { graphqlRequestHandler } from "@/lib/graphql-client";
import { CREATE_CLUB } from "@/graphql/mutations/club";

export enum USE_Club_KEY {
  CREATE_CLUB = "CREATE_CLUB",
}

export default function useClub() {
  const createClubMutation = useMutation({
    mutationKey: [USE_Club_KEY.CREATE_CLUB],
    mutationFn: async (variables: {
      name: string;
      description: string;
      logo: string;
      slug: string;
    }) =>
      graphqlRequestHandler({
        query: CREATE_CLUB,
        variables: { input: variables },
      }),
    onSuccess: () => {
      toast.success("Club created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    createClubMutation,
  };
}
