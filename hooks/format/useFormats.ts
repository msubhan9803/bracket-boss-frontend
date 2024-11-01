import { useQuery } from "@tanstack/react-query";
import { getAllFormats } from "@/server-requests/format.server-request";

export enum USE_FORMAT_KEY {
  GET_ALL_FORMATS = "GET_ALL_FORMATS",
}

export default function useFormats() {
  const {
    data: formats,
    isLoading,
    error,
  } = useQuery({
    queryKey: [USE_FORMAT_KEY.GET_ALL_FORMATS],
    queryFn: () => getAllFormats(),
  });

  return {
    formats,
    isLoading,
    error,
  };
}
