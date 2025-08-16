import React from "react";

const blogPosts = [
  {
    id: 1,
    title: "5 Study Habits That Will Boost Your Productivity",
    image: "https://source.unsplash.com/600x400/?study,desk",
    excerpt:
      "Learn the most effective habits to enhance focus, improve memory retention, and make your study sessions more efficient.",
    date: "August 10, 2025",
    author: "Jane Doe",
  },
  {
    id: 2,
    title: "How to Choose the Right Online Course for You",
    image: "https://source.unsplash.com/600x400/?online-learning",
    excerpt:
      "Choosing the right online course can be overwhelming. Here are key factors to consider for your learning journey.",
    date: "August 5, 2025",
    author: "John Smith",
  },
  {
    id: 3,
    title: "Top 7 Tools Every Student Should Know About",
    image: "https://source.unsplash.com/600x400/?education,tools",
    excerpt:
      "Discover powerful apps and tools that can help you manage your time, take better notes, and collaborate effectively.",
    date: "July 28, 2025",
    author: "Emily Brown",
  },
];

const BlogPreview = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12 rounded-xl">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-blue-800 inline-block relative after:content-[''] after:block after:h-1 after:w-16 after:bg-blue-500 after:mx-auto after:mt-2">
            Our Blogs
          </h2>
        </div>
        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden flex flex-col"
            >
              {/* Image */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="mt-4 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>{post.date}</span>
                  <span>By {post.author}</span>
                </div>

                {/* Button */}
                <a
                  href={`/blog/${post.id}`}
                  className="mt-4 inline-block px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPreview;
