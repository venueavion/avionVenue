import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Slideshow.css';
import Header from '../Header/Header';

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showBackground, setShowBackground] = useState(true);
  const [slides, setSlides] = useState([
    {
      id: 1,
      src: '/src/assets/images/church.jpg',
      alt: 'CHURCH BLDG',
    },
    {
      id: 2,
      src: '/src/assets/images/training.jpg',
      alt: 'TRAINING PIC',
    },
  ]);

  // Fetch and update slides when component mounts
  useEffect(() => {
    const fetchSlideshowImages = async () => {
      try {
        const types =
          'training_dashboard,parties_dashboard,church_dashboard,wedding_dashboard';
        const response = await axios.get(
          `http://localhost:3000/images/getOneImagePerType/types?types=${types}`
        );

        // Update slides with API data while maintaining the same structure
        if (response.data.length >= 3) {
          setSlides([
            {
              id: 1,
              src: response.data[0].path,
              alt: response.data[0].title || 'CINEMA STAGE',
            },
            {
              id: 2,
              src: response.data[1].path,
              alt: response.data[1].title || 'TRAINING PIC',
            },
            {
              id: 3,
              src: response.data[2].path,
              alt: response.data[2].title || 'CHURCH BLDG',
            },
          ]);
        }
      } catch (err) {
        console.error('Error fetching slideshow images:', err);
        // Keep default slides if API fails
      }
    };

    fetchSlideshowImages();
  }, []);

  // Rest of your existing code remains exactly the same
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [slides]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const shouldShow = scrollPosition < viewportHeight;

      console.log('Scroll Position:', scrollPosition);
      console.log('Viewport Height:', viewportHeight);
      console.log('Should Show Background:', shouldShow);

      setShowBackground(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full">
      {showBackground && (
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={slides[currentIndex].id}
              custom={direction}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3.8, ease: 'backOut' }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slides[currentIndex].src})` }}
            />
          </AnimatePresence>
        </div>
      )}

      <div className="h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h1
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter"
            style={{ fontWeight: 2800, fontSize: 125 }}
          >
            <div className="cal-sans-regular">
              <span className="block leading-[1.5]">AVION</span>
              <span className="block leading-[1.5]">VENUE</span>
            </div>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Slideshow;

// import { motion, AnimatePresence } from 'framer-motion';
// import { useState, useEffect, useRef } from 'react';
// import './Slideshow.css';
// import Header from '../Header/Header'; // Assuming Header component exists

// const slides = [
//   {
//     id: 1,
//     src: '/src/assets/images/cinema.jpg',
//     alt: 'CINEMA STAGE',
//   },
//   {
//     id: 2,
//     src: '/src/assets/images/training.jpg',
//     alt: 'TRAINING PIC',
//   },
//   {
//     id: 3,
//     src: '/src/assets/images/church.jpg',
//     alt: 'CHURCH BLDG',
//   },
// ];

// const Slideshow = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState(1);
//   const [showBackground, setShowBackground] = useState(true);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDirection(1);
//       setCurrentIndex((prev) => (prev + 1) % slides.length);
//     }, 8000);
//     return () => clearInterval(interval);
//   }, []);

//   // Handle scroll to show/hide background
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       const viewportHeight = window.innerHeight;
//       const shouldShow = scrollPosition < viewportHeight;

//       console.log('Scroll Position:', scrollPosition);
//       console.log('Viewport Height:', viewportHeight);
//       console.log('Should Show Background:', shouldShow);

//       setShowBackground(shouldShow);
//     };

//     window.addEventListener('scroll', handleScroll);

//     // Call handler once on mount to set initial state correctly
//     handleScroll();

//     // Cleanup function to remove event listener
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []); // Empty dependency array: effect runs once on mount, cleans up on unmount

//   return (
//     <div className="relative w-full">
//       {/* Conditional Background */}
//       {showBackground && (
//         <div className="fixed inset-0 -z-10">
//           <div className="absolute inset-0 bg-black bg-opacity-40"></div>
//           <AnimatePresence custom={direction} initial={false}>
//             <motion.div
//               key={slides[currentIndex].id}
//               custom={direction}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 3.8, ease: 'backOut' }}
//               className="absolute inset-0 bg-cover bg-center"
//               style={{ backgroundImage: `url(${slides[currentIndex].src})` }}
//             />
//           </AnimatePresence>
//         </div>
//       )}

//       {/* Hero Section (First Viewport) */}
//       <div className="h-screen flex items-center justify-center">
//         <div className="text-center px-4">
//           <h1
//             className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter"
//             style={{ fontWeight: 2800, fontSize: 125 }}
//           >
//             <div className="cal-sans-regular">
//               <span className="block leading-[1.5]">AVION</span>
//               <span className="block leading-[1.5]">VENUE</span>
//             </div>
//           </h1>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Slideshow;
