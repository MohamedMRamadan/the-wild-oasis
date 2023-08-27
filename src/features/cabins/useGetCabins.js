import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

function useGetCabins() {
  const {
    data: cabins,
    isLoading,
    // error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  return { isLoading, cabins };
}

export default useGetCabins;
