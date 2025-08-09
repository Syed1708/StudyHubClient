import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const COLORS = ["#4ade80", "#60a5fa", "#f472b6", "#facc15"];

export default function AdminHome() {
  const axiosSecure = useAxiosSecure();

  const { data = {} } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  const {
    totalUsers = 0,
    usersByRole = {},
    totalSessions = 0,
    totalMaterials = 0,
    sessionsByStatus = {},
  } = data;

  const userChartData = Object.entries(usersByRole).map(([role, count]) => ({
    name: role,
    value: count,
  }));

  const sessionStatusData = Object.entries(sessionsByStatus).map(
    ([status, count]) => ({
      name: status,
      value: count,
    })
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 text-base-content">
      <h1 className="text-2xl font-bold mb-4">📊 Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-base-100 shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold">👥 Total Users</h2>
          <p className="text-3xl font-bold text-success">{totalUsers}</p>
        </div>
        <div className="bg-base-100 shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold">🎓 Total Sessions</h2>
          <p className="text-3xl font-bold text-primary">{totalSessions}</p>
        </div>
        <div className="bg-base-100 shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold">📚 Total Materials</h2>
          <p className="text-3xl font-bold text-info">{totalMaterials}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-base-100 shadow rounded-xl p-6">
          <h3 className="text-lg font-bold mb-2">Users by Role</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={userChartData}>
              <XAxis dataKey="name" stroke="currentColor" />
              <YAxis stroke="currentColor" />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(var(--p))" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-base-100 shadow rounded-xl p-6">
          <h3 className="text-lg font-bold mb-2">Session Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={sessionStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {sessionStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`hsl(var(--a))`} // or use different tokens for variety
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
