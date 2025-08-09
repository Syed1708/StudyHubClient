import { useState } from "react";
import usePaginatedSessions from "../../../hooks/usePaginatedSessions";
import ManagePageLayout from "../../../components/manage/ManagePageLayout";
import SearchFilterBar from "../../../components/manage/SearchFilterBar";
import DataTable from "../../../components/manage/DataTable";
import Pagination from "../../../components/manage/Pagination";
import EditModal from "../../../components/manage/EditModal";
import ViewModal from "../../../components/manage/ViewModal";
import DeleteConfirm from "../../../components/manage/DeleteModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function ManageSessions() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(""); 
  const [editData, setEditData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [viewData, setViewData] = useState(null);

  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const [status, setStatus] = useState("");

const { data, isLoading } = usePaginatedSessions({ page, limit: 10, search, status });

  // console.log("data",data);

  const handleDelete = async (item) => {
    // console.log(item);

    DeleteConfirm({
      itemName: item.sessionTitle,
      onConfirm: async () => {
        await axiosSecure.delete(`/sessions/${item._id}`);
        queryClient.invalidateQueries(["sessions"]);
      },
    });
  };

  const columns = [
    { key: "sessionTitle", label: "Title" },
    { key: "sessionDuration", label: "Duration" },
    {
      key: "sessionDescription",
      label: "Description",
      render: (item) => item.sessionDescription.slice(0, 40) + "...",
    },
    { key: "status", label: "Status" },
  ];

  return (
    <ManagePageLayout
      title="Manage Sessions"
      onCreate={() => setOpenModal(true)}
    >
      <SearchFilterBar search={search} setSearch={setSearch} status={status} setStatus={setStatus} />


      {isLoading ? (
        <div className="text-center py-20 text-gray-400">Loading Data...</div>
      ) : (
        <DataTable
          columns={columns}
          data={data?.sessions || []}
          onEdit={(item) => {
            setEditData(item);
            setOpenModal(true);
          }}
          onDelete={handleDelete}
          onView={(item) => setViewData(item)}
        />
      )}
      <Pagination
        currentPage={page}
        totalPages={data?.totalPages || 1}
        onPageChange={setPage}
      />

      <EditModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditData(null);
        }}
        defaultValues={editData}
        onSubmit={async (formData) => {
          try {
            if (editData?._id) {
              // Edit
              await axiosSecure.patch(`/sessions/${editData._id}`, formData);
              toast.success("Session updated!");
            } else {
              // Create
              await axiosSecure.post(`/sessions/create`, formData);
              toast.success("Session created!");
            }

            queryClient.invalidateQueries(["sessions"]);
            setOpenModal(false);
            setEditData(null);
            
          } catch (err) {
            console.error(
              "Failed to save session:",
              err.response?.data || err.message
            );
          }
        }}
      />

      <ViewModal
        isOpen={!!viewData}
        item={viewData}
        onClose={() => setViewData(null)}
      />
    </ManagePageLayout>
  );
}
