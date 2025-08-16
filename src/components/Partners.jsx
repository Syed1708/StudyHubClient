import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

const partners = [
  {
    id: 1,
    name: "Coursera",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg",
  },
  {
    id: 2,
    name: "Udemy",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg",
  },
  {
    id: 3,
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    id: 4,
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    id: 5,
    name: "Khan Academy",
    logo: "https://www.svgrepo.com/show/353965/khan-academy-icon.svg",
  },
  {
    id: 6,
    name: "LinkedIn Learning",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Linkedin.svg",
  },
];



const PartnersCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-blue-800 inline-block relative after:content-[''] after:block after:h-1 after:w-16 after:bg-blue-500 after:mx-auto after:mt-2">
             Trusted by Leading Organizations
          </h2>
        </div>
        <Slider {...settings}>
          {partners.map((partner) => (
            <div key={partner.id} className="flex justify-center items-center p-4">
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-16 object-contain grayscale hover:grayscale-0 transition duration-300 mx-auto"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default PartnersCarousel;
