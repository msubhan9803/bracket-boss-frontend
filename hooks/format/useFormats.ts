import { useQuery } from "@tanstack/react-query";
import { getAllFormats } from "@/server-requests/bracket.server-request";

export enum USE_BRACKET_KEY {
  GET_ALL_BRACKETS = "GET_ALL_BRACKETS",
}

export default function useFormats() {
  const {
    data: formats,
    isLoading,
    error,
  } = useQuery({
    queryKey: [USE_BRACKET_KEY.GET_ALL_BRACKETS],
    queryFn: () => getAllFormats(),
  });

  return {
    formats,
    isLoading,
    error,
  };
}
