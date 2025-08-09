import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

export default function usePaginatedNotesStudent({
  page,
  limit,
  search,
}) {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const studentEmail = user.email;
  console.log(studentEmail);
  
  return useQuery({
    queryKey: ["notes", page, search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/notes/all`, {
        params: { page, limit, search, studentEmail },
      });
      return res.data;
    },
    keepPreviousData: true,
  });
}
