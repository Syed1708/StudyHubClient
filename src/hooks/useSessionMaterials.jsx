import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useSessionMaterials = (sessionId) => {
  const axiosSecure = useAxiosSecure();

  const { data: materials = [], isLoading } = useQuery({
    queryKey: ["materialsBySession", sessionId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meterials/by-session/${sessionId}`);
      return res.data;
    },
    enabled: !!sessionId,
  });

  return { materials, isLoading };
};

export default useSessionMaterials;
