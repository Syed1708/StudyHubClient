import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router';

export default function MySessions() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['myBookings', user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/sessions/bookings?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="flex justify-center py-20 text-lg font-medium">Loading your sessions...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">📚 My Booked Sessions</h2>

      {bookings.length === 0 ? (
        <div className="text-center text-gray-500 border border-dashed border-gray-300 p-10 rounded-xl shadow-sm">
          You haven’t booked any sessions yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
          <table className="min-w-full text-sm text-left bg-white rounded-xl">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Booking Date</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {booking.sessionTitle}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {booking.isPaid ? `$${booking.price}` : (
                      <span className="text-green-600 font-semibold">Free</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      to={`/dashboard/student/bookings/${booking.sessionId}`}
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 px-4 rounded-full transition duration-200"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
