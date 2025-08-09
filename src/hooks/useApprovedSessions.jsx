import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useApprovedSessions = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: sessions = [],
    isLoading: sessionLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["approvedSessions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/sessions/approved?tutorEmail=${user.email}`
      );
      return res.data;
    },
    enabled: !authLoading && !!user?.email,
  });

  return { sessions, isLoading: authLoading || sessionLoading, isError, refetch };
};

export default useApprovedSessions;
