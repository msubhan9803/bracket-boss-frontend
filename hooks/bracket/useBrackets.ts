import { useQuery } from "@tanstack/react-query";
import { getAllBrackets } from "@/server-requests/bracket.server-request";

export enum USE_BRACKET_KEY {
  GET_ALL_BRACKETS = "GET_ALL_BRACKETS",
}

export default function useBrackets() {
  const {
    data: brackets,
    isLoading,
    error,
  } = useQuery({
    queryKey: [USE_BRACKET_KEY.GET_ALL_BRACKETS],
    queryFn: () => getAllBrackets(),
  });

  return {
    brackets,
    isLoading,
    error,
  };
}
