
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export default function usePaginatedUsers({ page, search }) {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["users", page, search],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/paginated", {
        params: { page, limit: 10, search },
      });
      return res.data;
    },
    keepPreviousData: true,
  });
}
