import useAdminMaterials from "../../../hooks/useAdminMaterials";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function ManageAdminMaterials() {
  const { materials, isLoading, refetch } = useAdminMaterials();
  const axiosSecure = useAxiosSecure();

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure to delete?");
    if (!confirm) return;

    try {
      await axiosSecure.delete(`/meterials/admin/${id}`);
      toast.success("Material deleted");
      refetch();
    } catch (err) {
      toast.error("Delete failed", err);
    }
  };


  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Materials</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Session ID</th>
            <th>Link</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((mat) => (
            <tr key={mat._id}>
              <td>{mat.title}</td>
              <td>{mat.sessionId}</td>
              <td>
                <a href={mat.link} className="text-blue-500" target="_blank" rel="noreferrer">
                  View
                </a>
              </td>
              <td>
                <img src={mat.image} alt={mat.title} className="w-12 h-12 rounded object-cover" />
              </td>
              <td>
                <button className="btn btn-sm btn-error" onClick={() => handleDelete(mat._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
