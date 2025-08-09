import { useState } from "react";
import usePaginatedUsers from "../../../hooks/usePaginatedUsers";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Pagination from "../../../components/Manage/Pagination";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";


export default function ManageUser() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading } = usePaginatedUsers({ page, search });
  const axiosSecure = useAxiosSecure();

const queryClient = useQueryClient();

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axiosSecure.patch(`/users/${userId}/role`, { role: newRole });
      toast.success("Role updated successfully");
      queryClient.invalidateQueries(["users"]);
    } catch (err) {
      toast.error("Failed to update role");
      console.error(err);
    }
  };

  if (isLoading) return <div>Loading users...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or email"
        className="input input-bordered w-full max-w-md mb-4"
      />

      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Current Role</th>
            <th>Update Role</th>
          </tr>
        </thead>
        <tbody>
          {data?.users?.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <select
                  className="select select-bordered"
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                >
                  <option value="student">Student</option>
                  <option value="tutor">Tutor</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={page}
        totalPages={data?.totalPages || 1}
        onPageChange={setPage}
      />
    </div>
  );
}
