import { Link } from "react-router";
import { useState } from "react";
import useApprovedSessions from "../../../hooks/useApprovedSessions";
import UploadMaterialModal from "../../../components/UploadMaterialModal";
import useAllMaterials from "../../../hooks/useTutorMaterials";

export default function ApprovedSessions() {
  const { sessions, isLoading, isError, refetch } = useApprovedSessions();
  const {
    materials = [],
    isLoading: isMaterialsLoading,
    refetch: refetchMaterials,
  } = useAllMaterials();
  const [selectedSession, setSelectedSession] = useState(null);

  if (isLoading || isMaterialsLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-600 font-semibold mt-10">
        Error loading sessions.
      </div>
    );

  if (sessions.length === 0)
    return (
      <div className="text-center text-gray-500 mt-10 text-lg font-medium">
        No approved sessions found.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-extrabold text-primary mb-6 text-center">
        Approved Study Sessions
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full border rounded-lg">
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session, index) => {
              const hasMaterial = materials.some(
                (mat) => mat.sessionId === session._id
              );

              return (
                <tr key={session._id}>
                  <td>{index + 1}</td>
                  <td className="font-bold">{session.sessionTitle}</td>
                  <td>
                    {session.sessionDescription.length > 60
                      ? session.sessionDescription.slice(0, 60) + "..."
                      : session.sessionDescription}
                  </td>
                  <td>{session.sessionDuration}</td>
                  <td>
                    <span className="badge badge-success text-white">
                      {session.status || "Approved"}
                    </span>
                  </td>
                  <td className="text-center">
                    {!hasMaterial ? (
                      <button
                        onClick={() => setSelectedSession(session)}
                        className="btn btn-sm btn-outline btn-primary"
                      >
                        Upload Material
                      </button>
                    ) : (
                      <Link to="/dashboard/tutor/manage-meterials">
                        <button className="btn btn-sm btn-success">
                          Manage Materials
                        </button>
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedSession && (
        <UploadMaterialModal
          session={selectedSession}
          onClose={() => {
            setSelectedSession(null);
            refetchMaterials();
          }}
          refetch={refetch}
        />
      )}
    </div>
  );
}
