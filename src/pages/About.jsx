const About = () => {
  return (
    <div className="bg-base-100 text-gray-800 py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
            About StudyHub
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Empowering learners through organized, accessible, and impactful study sessions.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src="https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg"
            alt="Mission"
            className="rounded-xl shadow-lg"
          />
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-2">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              StudyHub is built to help students and professionals access structured,
              instructor-led sessions from anywhere. Whether you're preparing for exams,
              upskilling, or teaching, our platform bridges the gap between motivation
              and education.
            </p>
          </div>
        </div>

        {/* What We Offer */}
        <div className="grid md:grid-cols-2 gap-10 items-center flex-row-reverse">
          <img
            src="https://img.freepik.com/free-vector/knowledge-concept-illustration_114360-5991.jpg"
            alt="What We Offer"
            className="rounded-xl shadow-lg"
          />
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-2">What We Offer</h2>
            <ul className="list-disc ml-5 text-gray-700 space-y-2 text-lg">
              <li>Live and scheduled study sessions with expert tutors.</li>
              <li>Easy-to-use registration and booking system.</li>
              <li>Session history, reviews, and tutor ratings.</li>
              <li>Dashboard tools for managing events and participants.</li>
            </ul>
          </div>
        </div>

        {/* Meet the Team */}
        <div>
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-8">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                name: "Ayesha Khan",
                role: "Founder & Product Lead",
                img: "https://randomuser.me/api/portraits/women/68.jpg",
              },
              {
                name: "Imran Qureshi",
                role: "Tech Lead",
                img: "https://randomuser.me/api/portraits/men/45.jpg",
              },
              {
                name: "Sara Mahmood",
                role: "Community Manager",
                img: "https://randomuser.me/api/portraits/women/55.jpg",
              },
            ].map((member, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 mx-auto rounded-full mb-4 ring ring-blue-300"
                />
                <h4 className="text-lg font-semibold text-blue-700">
                  {member.name}
                </h4>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
