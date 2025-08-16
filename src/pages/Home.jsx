import Banner from "../components/Banner";
import BookedSessions from "../components/BookedSessions";
import TopTutorsSection from "../components/TopTutorsSection";
import Testimonials from "../components/Testimonials";
import FeaturedCourses from "../components/FeaturedCourses";
import RecentCourses from "../components/RecentCourses";
import Promotions from "../components/Promotions";
import Newsletter from "../components/Newsletter";
import BlogPreview from "../components/BlogPreview";
import Partners from "../components/Partners";

const HomePage = () => {
  return (
    <main className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Section 1: Hero */}
      <section>
        <Banner />
      </section>

      {/* Section 2: Featured Courses */}
      <section className=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FeaturedCourses />
      </section>

      {/* Section 3: Booked Sessions */}
      <section className=" mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <BookedSessions />
      </section>

      {/* Section 4: Top Tutors */}
      <section className="  mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TopTutorsSection />
      </section>

      {/* Section 5: Testimonials */}
      <section className=" px-2 sm:px-6 lg:px-8 py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <Testimonials />
      </section>

      {/* Section 6: Recent Courses */}
      <section className=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <RecentCourses />
      </section>

      {/* Section 7: Promotions */}
      <section className=" sm:px-6 lg:px-8 py-12 bg-blue-50 dark:bg-gray-700 rounded-lg">
        <Promotions />
      </section>

      {/* Section 8: Newsletter Signup */}
      <section className=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Newsletter />
      </section>

      {/* Section 9: Blog Preview */}
      <section className=" mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <BlogPreview />
      </section>

      {/* Section 10: Partners/Logos */}
      <section className=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Partners />
      </section>

    </main>
  );
};

export default HomePage;
