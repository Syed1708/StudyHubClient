import useAppvSessions from "../hooks/sessions/useAppvSessions";
import { Link } from "react-router";
import {
  User,
  Mail,
  Calendar,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  Timer,
} from "lucide-react";
import useUserRole from "../hooks/useUserRole";

export default function BookedSessions() {

  const {role} = useUserRole();
  // console.log(role);
  
  const isOngoing = (start, end) => {
    const now = new Date();
    return new Date(start) <= now && now <= new Date(end);
  };
  const { data: sessions = [], isLoading } = useAppvSessions();

  if (isLoading)
    return (
      <p className="text-center py-10 text-lg text-gray-500">Loading...</p>
    );

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      {/* <h2 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 drop-shadow-sm">
  🚀 Explore Our Study Sessions
</h2> */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-blue-800 inline-block relative after:content-[''] after:block after:h-1 after:w-16 after:bg-blue-500 after:mx-auto after:mt-2">
          Available Study Sessions
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
        {sessions.sessions.map((session) => (
          <div
            key={session._id}
            className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200 flex flex-col"
          >
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                {session.sessionTitle}
              </h3>
              <p className="text-gray-600 mb-4 flex-grow">
                {session.sessionDescription.length > 100
                  ? session.sessionDescription.slice(0, 100) + "..."
                  : session.sessionDescription}
              </p>

              <div className="space-y-3 text-gray-700 text-sm">
                <p className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" />
                  Tutor:{" "}
                  <span className="font-medium">
                    {session.tutorName} ({session.tutorEmail})
                  </span>
                </p>

                <p className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-500" />
                  Registration:{" "}
                  {new Date(
                    session.registrationStartDate
                  ).toLocaleDateString()}{" "}
                  - {new Date(session.registrationEndDate).toLocaleDateString()}
                </p>

                <p className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-500" />
                  Class Dates:{" "}
                  {new Date(session.classStartDate).toLocaleDateString()} -{" "}
                  {new Date(session.classEndDate).toLocaleDateString()}
                </p>

                <p className="flex items-center gap-2">
                  <Timer className="w-5 h-5 text-yellow-500" />
                  Duration: {session.sessionDuration}
                </p>

                <p className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-pink-500" />
                  Fee: {session.isPaid ? `$${session.registrationFee}` : "Free"}
                </p>

                <p className="flex items-center gap-2">
                  {session.status === "approved" ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      session.status === "approved"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {session.status}
                  </span>
                </p>
              </div>

              <span
                className={`inline-block mt-4 px-3 py-1 rounded-full text-sm font-semibold ${
                  isOngoing(
                    session.registrationStartDate,
                    session.registrationEndDate
                  )
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                } self-start`}
              >
                {isOngoing(
                  session.registrationStartDate,
                  session.registrationEndDate
                )
                  ? "Registration Open"
                  : "Registration Closed"}
              </span>

              {role === "student" ? (
                <Link
                  to={`/sessions/${session._id}`}
                  className="mt-6 inline-block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors duration-200"
                >
                  Read More
                </Link>
              ) : (
                <>
                  <p className=" text-red-600">Read More Login as a student</p>

                  <Link to="/login">
                    <button className=" btn">Login</button>
                  </Link>
                </>
              )}

            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/sessions">
          <button className="btn btn-outline btn-primary px-8 py-3 font-semibold text-lg rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200">
            View More Sessions
          </button>
        </Link>
      </div>
    </section>
  );
}
