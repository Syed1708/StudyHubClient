import {
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  GraduationCap,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800 pt-16 border-t border-blue-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 pb-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
            <GraduationCap className="text-blue-600" size={24} />
            StudyHub
          </h2>
          <p className="text-sm mt-3 leading-relaxed text-gray-600">
            Your go-to platform for managing and joining impactful study sessions with expert tutors and eager learners.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-lg font-semibold text-blue-600 mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/sessions" className="hover:text-blue-800 transition">All Sessions</a></li>
            <li><a href="/dashboard" className="hover:text-blue-800 transition">Dashboard</a></li>
            <li><a href="/about" className="hover:text-blue-800 transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-blue-800 transition">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-lg font-semibold text-blue-600 mb-3">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/faq" className="hover:text-blue-800 transition">FAQs</a></li>
            <li><a href="/privacy" className="hover:text-blue-800 transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-blue-800 transition">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-blue-600 mb-3">Contact Us</h4>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              support@studyhub.com
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-600" />
              +1 (800) 123-4567
            </p>
          </div>
          <div className="flex gap-4 mt-4">
            <a href="#" aria-label="Facebook">
              <Facebook className="text-blue-600 hover:text-blue-800 transition" size={20} />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter className="text-blue-600 hover:text-blue-800 transition" size={20} />
            </a>
            <a href="#" aria-label="LinkedIn">
              <Linkedin className="text-blue-600 hover:text-blue-800 transition" size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-blue-50 border-t border-blue-200 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} StudyHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
