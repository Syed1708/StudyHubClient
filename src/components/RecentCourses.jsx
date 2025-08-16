import React from "react";

const recentCoursesData = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    image: "https://source.unsplash.com/400x300/?web,development",
    description: "Learn to build complete web applications with MERN stack.",
    price: 89,
  },
  {
    id: 2,
    title: "Advanced Python Programming",
    image: "https://source.unsplash.com/400x300/?python,programming",
    description:
      "Take your Python skills to the next level with advanced concepts.",
    price: 69,
  },
  {
    id: 3,
    title: "Cloud Computing with AWS",
    image: "https://source.unsplash.com/400x300/?cloud,aws",
    description: "Master cloud services and deployment using AWS.",
    price: 99,
  },
  {
    id: 4,
    title: "Cybersecurity Essentials",
    image: "https://source.unsplash.com/400x300/?cybersecurity,security",
    description: "Understand threats, protection methods, and ethical hacking.",
    price: 79,
  },
];

const RecentCourses = () => {
  return (
    <div>
      {/* Heading */}
      <div className="text-center mb-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-blue-800 inline-block relative after:content-[''] after:block after:h-1 after:w-16 after:bg-blue-500 after:mx-auto after:mt-2">
            Recent Courses
          </h2>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentCoursesData.map((course) => (
          <div
            key={course.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            {/* Image */}
            <div className="w-full aspect-[4/3] overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-4">
              <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm flex-1">
                {course.description}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-blue-600 font-bold">${course.price}</span>
                <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                  See More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentCourses;
