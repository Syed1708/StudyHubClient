
import useRejectedSessions from "../../../hooks/useRejectedSessions"; 
export default function RejectedSessions() {
  const { sessions, isLoading, isError } = useRejectedSessions(); 

  if (isLoading)
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


  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-extrabold text-red-600 mb-6 text-center">
        ❌ Rejected Study Sessions
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
              <th>Rejection Reason</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session, index) => (
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
                  <span className="badge badge-error text-white">Rejected</span>
                </td>
                <td>
                  <span className="text-sm text-red-600 font-medium">
                    {session.rejectionReason || "—"}
                  </span>
                </td>
                <td>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {session.feedback || "—"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
