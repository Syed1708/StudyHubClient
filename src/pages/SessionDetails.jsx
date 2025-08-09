import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useUserRole";
import useAxios from "../hooks/useAxios";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import ReviewSection from "../components/ReviewSection";

export default function SessionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { role } = useRole();
  const axios = useAxios();
  const axiosSecure = useAxiosSecure();

  const { data: session, isLoading } = useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      const res = await axios.get(`/sessions/home/${id}`);
      return res.data;
    },
  });
//  console.log(session);
const isRegistrationClosed = session?.registrationEndDate
  ? new Date(session.registrationEndDate) < new Date()
  : false;

  const { data: bookings = [] } = useQuery({
    queryKey: ["userBookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/sessions/bookings?email=${user.email}`);
      return res.data;
    },
  });

  const isAlreadyBooked = bookings.some((b) => b.sessionId === id);

  const handleBook = async () => {
    if (!user) {
      toast.error("Please login to book this session.");
      return navigate("/login");
    }



    if (role !== "student") {
      toast.error("Only students can book sessions.");
      return;
    }

    if (session.isPaid && session.registrationFee > 0) {
      return navigate(`/payment/${session._id}`);
    }

    try {
      // toast.error('No Entry')
      // return;
      const bookingData = {
        sessionId: session._id,
        studentEmail: user.email,
        sessionTitle: session.sessionTitle,
        studentName: user.displayName,
        bookingDate: new Date().toISOString(),
        isPaid: session.isPaid || false,
        price: session.registrationFee || 0,
      }; 

      await axiosSecure.post("/sessions/bookings", bookingData);
      toast.success("Session booked successfully!");
      navigate("/dashboard/student/sessions");
    } catch (err) {
      toast.error("Booking failed", err);
    }
  };

  if (isLoading) return <div className="text-center text-lg py-10">Loading session...</div>;
  if (!session) return <div className="text-red-500 text-center">Session not found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="bg-white shadow-md rounded-xl p-6 border space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">{session.sessionTitle}</h1>
        <p className="text-gray-600">{session.sessionDescription}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm md:text-base">
          <p><strong>👨‍🏫 Tutor:</strong> {session.tutorName} ({session.tutorEmail})</p>
          <p><strong>📌 Status:</strong> {session.status}</p>
          <p><strong>📚 Duration:</strong> {session.sessionDuration}</p>
          <p><strong>📅 Class Start:</strong> {new Date(session.classStartDate).toLocaleDateString()}</p>
          <p><strong>📅 Class End:</strong> {new Date(session.classEndDate).toLocaleDateString()}</p>
          <p><strong>📝 Registration Starts:</strong> {new Date(session.registrationStartDate).toLocaleDateString()}</p>
          <p><strong>📝 Registration Ends:</strong> {new Date(session.registrationEndDate).toLocaleDateString()}</p>
          <p><strong>💰 Fee:</strong> {session.registrationFee > 0 ? `$${session.registrationFee}` : "Free"}</p>
          <p><strong>⏰ Created At:</strong> {new Date(session.createdAt).toLocaleString()}</p>
        </div>

<div className="pt-4">
  {user ? (
    isAlreadyBooked ? (
      <button className="btn btn-success" disabled>
        ✅ Already Booked
      </button>
    ) : role === "student" ? (
      isRegistrationClosed ? (
        <button className="btn btn-error" disabled>
          ❌ Registration Closed
        </button>
      ) : (
        <button className="btn btn-primary" onClick={handleBook}>
          Book Now
        </button>
      )
    ) : (
      <button
        className="btn btn-warning"
        onClick={() => toast.info("Login as Student to Book")}
      >
        Login as Student
      </button>
    )
  ) : (
    <button className="btn btn-secondary" onClick={() => navigate("/login")}>
      Login to Book
    </button>
  )}
</div>


      </div>

      <div className="mt-10">
        <ReviewSection sessionId={session._id} />
      </div>
    </div>
  );
}
