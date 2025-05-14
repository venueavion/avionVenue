import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AvionSection = ({ title, description, imageUrl, reverse, linkUrl }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        when: 'beforeChildren',
        staggerChildren: 0.3,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: reverse ? '-5%' : '5%' },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 0.77, 0.47, 0.97],
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 0.77, 0.47, 0.97],
      },
    },
  };

  return (
    <motion.section
      className={`relative overflow-hidden ${reverse ? 'bg-gray-50' : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Full-width container */}
      <div className="max-w-[1920px] mx-auto">
        <div
          className={`flex flex-col ${
            reverse ? 'md:flex-row-reverse' : 'md:flex-row'
          }`}
        >
          {/* Text Content - takes half width on desktop */}
          <motion.div
            className="w-full md:w-1/2 px-6 py-16 md:py-24 lg:py-32 flex items-center"
            variants={textVariants}
          >
            <div className="max-w-lg mx-auto md:mx-16 lg:mx-24">
              <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-light text-gray-800 mb-6 font-serif tracking-tight uppercase">
                {title}
              </h2>
              <p className="text-center text-gray-600 leading-relaxed mb-8 font-sans text-lg">
                {description}
              </p>
              <div className="flex justify-center">
                <Link
                  to={linkUrl}
                  className="inline-block px-2 py-1 text-gray-800 font-medium capitalize tracking-wider hover:text-gray-900 transition duration-300 font-sans text-sm relative group"
                >
                  Read more
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Image Content - takes half width on desktop but full height */}
          <motion.div
            className="w-full md:w-1/2 h-[400px] md:h-auto"
            variants={imageVariants}
          >
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AvionSection;
