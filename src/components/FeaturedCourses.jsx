import React from "react";

const featuredCoursesData = [
  {
    id: 1,
    title: "Mastering JavaScript",
    image: "https://source.unsplash.com/400x300/?javascript,code",
    description: "Learn JavaScript from basics to advanced concepts.",
    price: 49
  },
  {
    id: 2,
    title: "React for Beginners",
    image: "https://source.unsplash.com/400x300/?react,web",
    description: "Build interactive UIs using React.js with hands-on projects.",
    price: 59
  },
  {
    id: 3,
    title: "Data Science Bootcamp",
    image: "https://source.unsplash.com/400x300/?data,python",
    description: "Master data analysis, visualization, and machine learning.",
    price: 99
  },
  {
    id: 4,
    title: "UI/UX Design Fundamentals",
    image: "https://source.unsplash.com/400x300/?design,uiux",
    description: "Learn design principles and tools for modern web apps.",
    price: 39
  }
];

const FeaturedCourses = () => {
  return (
    <div>
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Featured Courses</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Our most popular courses picked just for you
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredCoursesData.map((course) => (
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

export default FeaturedCourses;
