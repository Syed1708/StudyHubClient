import { Star } from "lucide-react";

const tutors = [
  {
    id: 1,
    name: "Galena Valdez",
    email: "galena.valdez@example.com",
    bio: "Physics & Math tutor with over a decade of teaching experience. Focused on building strong foundational skills.",
    expertise: "Physics, Mathematics",
    sessions: 120,
    rating: 4.9,
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Front-end developer turned educator. Loves teaching React and building intuitive UI components.",
    expertise: "JavaScript, React",
    sessions: 98,
    rating: 4.8,
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    name: "Fatima Khan",
    email: "fatima.khan@example.com",
    bio: "Enthusiastic CS teacher focused on problem-solving and logic building for beginners.",
    expertise: "C++, Data Structures",
    sessions: 87,
    rating: 4.7,
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 4,
    name: "Michael Liu",
    email: "m.liu@example.com",
    bio: "Experienced educator who simplifies complex theories with real-world analogies.",
    expertise: "Chemistry, Biology",
    sessions: 105,
    rating: 4.85,
    avatar: "https://i.pravatar.cc/150?img=52",
  },
  {
    id: 5,
    name: "Aarav Mehta",
    email: "aarav.mehta@example.com",
    bio: "Former Olympiad participant. Teaches math in a way that makes students love numbers.",
    expertise: "Algebra, Calculus",
    sessions: 135,
    rating: 5.0,
    avatar: "https://i.pravatar.cc/150?img=64",
  },
  {
    id: 6,
    name: "Sofia Martinez",
    email: "sofia.martinez@example.com",
    bio: "Bilingual educator passionate about helping students succeed in English and Spanish.",
    expertise: "English, Spanish",
    sessions: 76,
    rating: 4.6,
    avatar: "https://i.pravatar.cc/150?img=29",
  },
];

export default function TopTutorsSection() {
  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-blue-700 mb-10">
          🌟 Top Tutors
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <div key={tutor.id} className="bg-white shadow border border-gray-200 rounded-xl p-5 transition hover:shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={tutor.avatar}
                  alt={tutor.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500"
                />
                <div>
                  <h3 className="text-lg font-semibold text-blue-700">{tutor.name}</h3>
                  <p className="text-sm text-gray-500">{tutor.expertise}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">{tutor.bio}</p>
              <div className="flex justify-between text-sm text-gray-700 mt-auto">
                <span>🧑‍🏫 {tutor.sessions} sessions</span>
                <span className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-400" />
                  {tutor.rating.toFixed(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
