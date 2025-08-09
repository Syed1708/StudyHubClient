import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import ReviewSection from '../../../components/ReviewSection';

export default function BookedSessionDetails() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: session, isLoading } = useQuery({
    queryKey: ['bookedSession', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sessions/home/${id}`);
      return res.data;
    },
  });

  const { data: materials = [] } = useQuery({
    queryKey: ['materials', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sessions/${id}/materials`);
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (!session) return <div className="text-red-500">Session not found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      {/* Session Info */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">{session.sessionTitle}</h2>
        <p className="text-gray-600 mb-2">
          👨‍🏫 Tutor: <strong>{session.tutorName}</strong> ({session.tutorEmail})
        </p>
        <p className="text-gray-700 italic">{session.sessionDescription}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm text-gray-800">
          <p><strong>📌 Status:</strong> {session.status}</p>
          <p><strong>💵 Fee:</strong> {session.isPaid ? `$${session.registrationFee}` : "Free"}</p>
          <p><strong>🕐 Duration:</strong> {session.sessionDuration}</p>
          <p><strong>📅 Class Start:</strong> {new Date(session.classStartDate).toLocaleDateString()}</p>
          <p><strong>📅 Class End:</strong> {new Date(session.classEndDate).toLocaleDateString()}</p>
          <p><strong>📝 Registration Start:</strong> {new Date(session.registrationStartDate).toLocaleDateString()}</p>
          <p><strong>📝 Registration End:</strong> {new Date(session.registrationEndDate).toLocaleDateString()}</p>
          <p><strong>📆 Created At:</strong> {new Date(session.createdAt).toLocaleString()}</p>
        </div>
      </div>

      {/* Study Materials */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">📁 Study Materials</h3>
        {materials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {materials.map((mat) => (
              <div key={mat._id} className="bg-white border shadow-sm rounded-lg p-4">
                <h4 className="font-semibold text-blue-600">{mat.title}</h4>
                <a
                  href={mat.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 underline mt-2 inline-block"
                >
                  View Material
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No materials uploaded for this session.</p>
        )}
      </div>

      {/* Review Section */}
      <div className="mt-10">
        <ReviewSection sessionId={id} />
      </div>
    </div>
  );
}
