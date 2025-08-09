import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

export default function usePaginatedSessions({ page, limit, search, status  }) {
  const axiosSecure = useAxiosSecure();
const {user} = useAuth();

const tutorEmail = user.email;
// console.log(tutorEmail);

  return useQuery({
    queryKey: ["sessions", page, search, status ],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sessions/paginated`, {
        params: { page, limit, search, status, tutorEmail }
      });
      return res.data;
    },
    keepPreviousData: true,
  });
}
