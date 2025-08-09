import { useState } from "react";
import usePaginatedNotesStudent from "../../../hooks/usePaginatedNotesStudent";
import ManagePageLayout from "../../../components/manage/ManagePageLayout";
import SearchBox from "../../../components/manage/SearchBox";
import DataTable from "../../../components/manage/DataTable";
import Pagination from "../../../components/manage/Pagination";
import DeleteConfirm from "../../../components/manage/DeleteModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import NoteEditModal from "../../../components/Manage/NoteEditModal";
import NoteViewModal from "../../../components/Manage/NoteViewModal";

export default function ManageNotes() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editData, setEditData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [viewData, setViewData] = useState(null);

  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const { data } = usePaginatedNotesStudent({
    page,
    limit: 10,
    search,
  });

  // console.log("data",data);

  const handleDelete = async (item) => {
    // console.log(item);

    DeleteConfirm({
      itemName: item.sessionTitle,
      onConfirm: async () => {
        await axiosSecure.delete(`/notes/${item._id}`);
        queryClient.invalidateQueries(["notes"]);
      },
    });
  };

  const columns = [
    { key: "noteTitle", label: "Title" },
    {
      key: "noteDescription",
      label: "Description",
      render: (item) => item.noteDescription.slice(0, 40) + "...",
    },
  ];

  return (
    <ManagePageLayout title="Manage Notes">
      <SearchBox
        search={search}
        setSearch={setSearch}
        onCreate={() => setOpenModal(true)}
      />

      {data?.notes?.length > 0 ? (
        <DataTable
          columns={columns}
          data={data?.notes || []}
          onEdit={(item) => {
            setEditData(item);
            setOpenModal(true);
          }}
          onDelete={handleDelete}
          onView={(item) => setViewData(item)}
        />
      ) : (
        <div className="text-center text-gray-500 border border-dashed border-gray-300 p-10 rounded-xl shadow-sm">
          You haven’t booked any notes yet.
        </div>
      )}

      <Pagination
        currentPage={page}
        totalPages={data?.totalPages || 1}
        onPageChange={setPage}
      />

      <NoteEditModal
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
              await axiosSecure.patch(`/notes/${editData._id}`, formData);
              toast.success("Note updated!");
            } else {
              // Create
              await axiosSecure.post(`/notes/create`, formData);
              toast.success("Note created!");
            }

            queryClient.invalidateQueries(["notes"]);
            setOpenModal(false);
            setEditData(null);
          } catch (err) {
            console.error(
              "Failed to save Note:",
              err.response?.data || err.message
            );
          }
        }}
      />

      <NoteViewModal
        isOpen={!!viewData}
        item={viewData}
        onClose={() => setViewData(null)}
      />
    </ManagePageLayout>
  );
}
