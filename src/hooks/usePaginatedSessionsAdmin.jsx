import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export default function usePaginatedSessionsAdmin({
  page,
  limit,
  search,
  status,
}) {
  const axiosSecure = useAxiosSecure();
  // const { user } = useAuth();

  // const adminEmail = user.email;
  return useQuery({
    queryKey: ["sessions", page, search, status],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sessions/all`, {
        params: { page, limit, search, status },
      });
      return res.data;
    },
    keepPreviousData: true,
  });
}
