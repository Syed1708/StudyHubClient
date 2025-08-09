import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function StudentHome() {
  const axiosSecure = useAxiosSecure();
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["studentStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/student/stats");
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Student Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Booked Sessions" value={stats.bookedSessions} />
        <StatCard title="Paid Sessions" value={stats.paidSessions} />
        <StatCard title="Upcoming Sessions" value={stats.upcomingSessions} />
        <StatCard title="Reviews Given" value={stats.reviewCount} />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-base-100 shadow rounded-lg p-4 text-center text-base-content">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold text-success">{value}</p>
    </div>
  );
}
