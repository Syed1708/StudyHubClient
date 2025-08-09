import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRejectedSessions = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: sessions = [],
    isLoading: sessionLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["rejectedSessions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/sessions/rejected?tutorEmail=${user.email}`
      );
      return res.data;
    },
    enabled: !authLoading && !!user?.email,
  });

  return { sessions, isLoading: authLoading || sessionLoading, isError, refetch };
};

export default useRejectedSessions;
