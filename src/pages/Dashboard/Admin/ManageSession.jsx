import { useState } from "react";
import usePaginatedSessionsAdmin from "../../../hooks/usePaginatedSessionsAdmin";
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
import AdminDataTable from "../../../components/Manage/AdminDataTable";
import ApprovalModal from "../../../components/Manage/ApprovalModal";

export default function ManageSessions() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editData, setEditData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [approveData, setApproveData] = useState(null);
  const [status, setStatus] = useState("");

  // reject modal
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [feedback, setFeedback] = useState("");

  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = usePaginatedSessionsAdmin({
    page,
    limit: 10,
    search,
    status,
  });

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

  const openApprovalModal = (item) => setApproveData(item);
  const openRejectModal = (session) => {
    setSelectedSession(session);
    setRejectionReason("");
    setFeedback("");
    setShowRejectModal(true);
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a rejection reason.");
      return;
    }

    try {
      await axiosSecure.patch(`/sessions/${selectedSession._id}/reject`, {
        rejectionReason,
        feedback,
      });
      toast.success("Session rejected");
      queryClient.invalidateQueries(["sessions"]);
      setShowRejectModal(false);
    } catch (err) {
      toast.error("Failed to reject session", err);
    }
  };

  const columns = [
    { key: "sessionTitle", label: "Title" },
    { key: "status", label: "Status" },
    { key: "registrationFee", label: "Price" },
    { key: "tutorEmail", label: "Tutor" },
  ];

  return (
    <ManagePageLayout
      title="Manage Sessions"
      onCreate={() => setOpenModal(true)}
    >
      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      {isLoading ? (
        <div className="text-center py-20 text-gray-400">Loading Data...</div>
      ) : (
        <AdminDataTable
          columns={columns}
          data={data?.sessions || []}
          onView={(item) => setViewData(item)}
          onApprove={openApprovalModal}
          onReject={openRejectModal}
          onDelete={handleDelete}
        />
      )}
      <Pagination
        currentPage={page}
        totalPages={data?.totalPages || 1}
        onPageChange={setPage}
      />

      <ApprovalModal
        isOpen={!!approveData}
        item={approveData}
        onClose={() => setApproveData(null)}
        onSubmit={async (formData) => {
          try {
            await axiosSecure.patch(
              `/sessions/${approveData._id}/approve`,
              formData
            );
            toast.success("Session approved");
            queryClient.invalidateQueries(["sessions"]);
            setApproveData(null);
          } catch (err) {
            toast.error("Failed to approve session");
            console.error(err);
          }
        }}
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

      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Reject Session
            </h3>

            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
              Rejection Reason <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full mb-4"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter reason for rejection"
              required
            />

            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
              Feedback (optional)
            </label>
            <textarea
              className="textarea textarea-bordered w-full mb-4"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Add any additional feedback"
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowRejectModal(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button onClick={handleReject} className="btn btn-error">
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </ManagePageLayout>
  );
}
