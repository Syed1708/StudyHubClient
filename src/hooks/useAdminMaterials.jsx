import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdminMaterials = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();


  const {
    data: materials = [],
    isLoading: adminMLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["adminMaterials"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/meterials/admin-manage`
      );
      return res.data;
    },
    enabled: !authLoading && !!user?.email,
  });

  return { materials, isLoading: authLoading || adminMLoading, isError, refetch };
};

export default useAdminMaterials;
