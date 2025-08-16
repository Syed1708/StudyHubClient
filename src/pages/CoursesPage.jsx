import { Link } from "react-router";
import {
  CalendarDays,
  Clock3,
  DollarSign,
  User2,
  GraduationCap,
} from "lucide-react";
import Pagination from "../components/manage/Pagination";
import { useState } from "react";
import useAxios from "../hooks/useAxios";
import useUserRole from "../hooks/useUserRole";
import { useQuery } from "@tanstack/react-query";
import SearchFilter from "../components/Manage/SearchFilter";

export default function CoursesPage() {
  const { role } = useUserRole();
  const axios = useAxios();
  const [page, setPage] = useState(1);
  const [option, setOption] = useState("");
  const [search, setSearch] = useState("");

  const { data = [], isLoading } = useQuery({
    queryKey: ["courses", page, search, option],
    queryFn: async () => {
      const res = await axios.get("/courses/allCourses", {
        params: { page, limit: 10, search, option },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const isOngoing = (start, end) => {
    const now = new Date();
    return new Date(start) <= now && now <= new Date(end);
  };

  if (isLoading) return <p className="text-center py-10">Loading courses...</p>;

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-700 drop-shadow-sm">
        Available Courses
      </h2>

      {/* <SearchFilter search={search} setSearch={setSearch} option={option} setOption={setOption} /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.courses.map((course) => (
          <div
            key={course._id}
            className="card bg-white border border-gray-200 shadow-sm hover:shadow-md transition rounded-xl"
          >
            <div className="card-body space-y-2">
              <h3 className="text-xl font-bold text-blue-700">{course.courseTitle}</h3>
              <p className="text-gray-600 text-sm">{course.courseDescription?.slice(0, 80)}...</p>

              <div className="text-sm text-gray-700 space-y-1">
                <p className="flex items-center gap-2">
                  <User2 size={16} className="text-indigo-500" />
                  <strong>{course.instructorName}</strong> ({course.instructorEmail})
                </p>
                <p className="flex items-center gap-2">
                  <Clock3 size={16} className="text-indigo-500" />
                  Duration: {course.courseDuration}
                </p>
                <p className="flex items-center gap-2">
                  <DollarSign size={16} className="text-indigo-500" />
                  {course.isPaid ? `$${course.price}` : "Free"}
                </p>
                <p className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-indigo-500" />
                  {new Date(course.startDate).toLocaleDateString()} →{" "}
                  {new Date(course.endDate).toLocaleDateString()}
                </p>
                <p className="flex items-center gap-2">
                  <GraduationCap size={16} className="text-indigo-500" />
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      isOngoing(course.startDate, course.endDate)
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {isOngoing(course.startDate, course.endDate) ? "Ongoing" : "Closed"}
                  </span>
                </p>

                {role === "student" ? (
                  <Link to={`/courses/${course._id}`}>
                    <button className="btn bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors duration-200">
                      Read More
                    </button>
                  </Link>
                ) : (
                  <>
                    <p className="text-red-600">Read More Login as a student</p>
                    <Link to="/login">
                      <button className="btn">Login</button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={data?.totalPages || 1}
        onPageChange={setPage}
      />
    </section>
  );
}
