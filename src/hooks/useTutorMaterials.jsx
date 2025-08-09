import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useTutorMaterials = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();


  const {
    data: materials = [],
    isLoading: tutorMLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["tutorMaterials", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/meterials/manage?tutorEmail=${user.email}`
      );
      return res.data;
    },
    enabled: !authLoading && !!user?.email,
  });

  return { materials, isLoading: authLoading || tutorMLoading, isError, refetch };
};

export default useTutorMaterials;
