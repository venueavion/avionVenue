import { useEffect, useRef } from 'react';

const WelcomeSection = ({ title, description }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{title} </h2>
          <p className="text-lg mb-8">{description}</p>
          <a
            href="#"
            className="inline-block border-b-2 border-gray-900 pb-1 font-medium hover:text-gray-600 transition"
          >
            FIND OUT MORE
          </a>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
