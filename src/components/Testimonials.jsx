import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const testimonials = [
  {
    name: "Ayesha Malik",
    feedback:
      "Booking study sessions through this platform has made my exam prep so much more organized. I love the reminders too!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "Medical Student",
  },
  {
    name: "Mohammed Rizwan",
    feedback:
      "The tutors here are highly qualified. I attended a physics session that cleared all my doubts before finals.",
    avatar: "https://randomuser.me/api/portraits/men/58.jpg",
    role: "Engineering Student",
  },
  {
    name: "Fatima Khan",
    feedback:
      "As a tutor, managing my sessions and communicating with students has been smooth and easy.",
    avatar: "https://randomuser.me/api/portraits/women/51.jpg",
    role: "Tutor - Math",
  },
  {
    name: "Ali Zubair",
    feedback:
      "Great platform for peer learning. I’ve joined multiple group sessions and found study buddies for life!",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    role: "Computer Science Major",
  },
  {
    name: "Nida Farooq",
    feedback:
      "The user interface is clean and makes it easy to book, reschedule, or cancel sessions. Love the flexibility.",
    avatar: "https://randomuser.me/api/portraits/women/29.jpg",
    role: "Pre-Med Student",
  },
  {
    name: "Hassan Jamil",
    feedback:
      "A very supportive learning environment. The paid sessions are totally worth it for exam crash courses.",
    avatar: "https://randomuser.me/api/portraits/men/61.jpg",
    role: "Business Student",
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 4500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h2 className="text-4xl font-bold text-center mb-12 text-blue-700">
        What Our Learners Say
      </h2>
      <Slider {...settings}>
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white p-8 md:p-10 rounded-xl shadow-xl border text-center">
            <img
              src={t.avatar}
              alt={t.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-blue-500"
            />
            <p className="text-gray-600 italic mb-4 text-lg leading-relaxed">
              “{t.feedback}”
            </p>
            <h4 className="text-xl font-semibold text-gray-800">{t.name}</h4>
            <p className="text-sm text-gray-500">{t.role}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
