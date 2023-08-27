import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

function useGetBookings() {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();
  // (1) Filter
  const filteredValue = searchParams.get("status");
  const filter =
    !filteredValue || filteredValue === "all"
      ? null
      : { field: "status", value: filteredValue };
  // (2) Sort
  const sortedByValue = searchParams.get("sortBy") || "startDate-desc";

  const [field, direction] = sortedByValue.split("-");
  const sort = { field, direction };

  // (3) Pagintaion
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const { data: { data, count } = {}, isLoading } = useQuery({
    queryKey: [
      "bookings",
      filter,
      sort,
      page /* it's depend on filter to re-fetch*/,
    ],
    queryFn: () => getBookings({ filter, sort, page }),
  });

  // Pre-Fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: [
        "bookings",
        filter,
        sort,
        page + 1 /* it's depend on filter to re-fetch*/,
      ],
      queryFn: () => getBookings({ filter, sort, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: [
        "bookings",
        filter,
        sort,
        page - 1 /* it's depend on filter to re-fetch*/,
      ],
      queryFn: () => getBookings({ filter, sort, page: page - 1 }),
    });
  return [isLoading, data, count];
}

export default useGetBookings;
