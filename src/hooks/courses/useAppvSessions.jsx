import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../useAxios";

export default function useAppvSessions() {
  const axiosPublic = useAxiosPublic();
  return useQuery({
    queryKey: ["apprvSessions"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/sessions/approvedhome`);
      return res.data;
    },
  });
}
