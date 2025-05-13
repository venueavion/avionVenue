import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AvionSection from '../AvionSection/AvionSection';

// Import fallback images
import meetingsImg from '../../assets/images/meeting.jpg';
import diningImg from '../../assets/images/dining.jpg';
import roofImg from '../../assets/images/trainning.jpg';

const AvionPage = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default sections data (used only if API fails completely)
  const defaultSections = [
    {
      title: 'WORSHIP',
      description: 'Avion Venue is an inspirational events space...',
      imageUrl: meetingsImg,
      reverse: false,
      linkUrl: '/worship',
    },
    {
      title: 'PARTIES',
      description: 'The Kitchen is at the heart and soul of The Avion Venu...',
      imageUrl: diningImg,
      reverse: true,
      linkUrl: '/parties',
    },
    {
      title: 'TRAININGS',
      description: 'Training is on our private first floor rooftop...',
      imageUrl: roofImg,
      reverse: false,
      linkUrl: '/training',
    },
  ];

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const types =
          'wedding_animate,parties_animate,training_animate,privateHire_animate';
        const apiUrl = `http://localhost:3000/images/getOneImagePerType/types?types=${types}`;
        console.log('Request URL:', apiUrl);

        const response = await axios.get(apiUrl, {
          validateStatus: (status) => status < 500,
        });

        console.log('API Response:', response.data);

        if (response.data && response.data.length > 0) {
          // Create sections from all API responses
          const apiSections = response.data.map((item, index) => ({
            title: item.title || `Section ${index + 1}`,
            description: item.description || 'Description not available',
            imageUrl: item.path,
            reverse: index % 2 !== 0, // Alternate layout
            linkUrl: getLinkUrlBasedOnType(item.category), // You'll need to implement this
          }));

          setSections(apiSections);
        } else {
          throw new Error('API returned empty data');
        }
      } catch (err) {
        console.error('API Error:', err);
        setError(`Failed to load content. Using default sections.`);
        setSections(defaultSections);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  // Helper function to determine link URL based on image type
  const getLinkUrlBasedOnType = (type) => {
    switch (type) {
      case 'church_animate':
        return '/worship';
      case 'parties_animate':
        return '/private-hire';
      case 'training_animate':
        return '/training';
      case 'wedding_animate':
        return '/weddings';
      case 'privateHire_animate':
        return '/private-hire';
      default:
        return '/';
    }
  };

  if (loading)
    return <div className="text-center py-8">Loading sections...</div>;

  return (
    <div className="py-12 md:py-20 font-sans bg-white">
      {error && <div className="text-center py-2 text-red-500">{error}</div>}
      {sections.map((section, index) => (
        <AvionSection
          key={index}
          title={section.title}
          description={section.description}
          imageUrl={section.imageUrl}
          reverse={section.reverse}
          linkUrl={section.linkUrl}
        />
      ))}
    </div>
  );
};

export default AvionPage;

// #####################################################################################################################################################################
//
//
//
//
//
//
//
//
//
//
//
// import React from 'react';
// import AvionSection from '../AvionSection/AvionSection';

// // Import your small images
// import meetingsImg from '../../assets/images/meeting.jpg';
// import diningImg from '../../assets/images/dining.jpg';
// import roofImg from '../../assets/images/trainning.jpg';

// const AvionPage = () => {
//   const sections = [
//     {
//       title: 'Worship',
//       description:
//         'The Mowbray is an inspirational events space for businesses to hold their meetings, conferences, team away days and training sessions. Our Sheffield meeting room is perfect for smaller groups of up to 20 and larger groups of up to 150 and we have a range of flexible floor plans to provide your perfect orientation for a productive and inspiring day.',
//       imageUrl: meetingsImg, // Using local image
//       reverse: false,
//       linkUrl: '/meetings', // or external URL "https://themowbray.co.uk/meetings"
//     },
//     {
//       title: 'Parties',
//       description:
//         'The Kitchen is at the heart and soul of The Mowbray. We have developed our own feasting style to suit every occasion from when the sun rises until the stars come out. For lovers of our Sheffield heartland and supporters of local, regional and Yorkshire food, explore our seasonal menus and enjoy the luxury of one to one consultations with our head chef.',
//       imageUrl: diningImg, // Using local image
//       reverse: true,
//       linkUrl: '/private-dining', //  'https://themowbray.co.uk/sheffield-private-dining', // External link as requested
//     },
//     {
//       title: 'Training',
//       description:
//         "Up On The Roof is our private first floor rooftop which was part of the original restoration of The Mowbray. It's a complete hideaway escape with leafy green views over Park Wood Springs and the historic rooftops of Neepsend. There's something really special about cooking and eating outside - senses are heightened, great vibes happen.",
//       imageUrl: roofImg, // Using local image
//       reverse: false,
//       linkUrl: '/rooftop', // or external URL "https://themowbray.co.uk/rooftop"
//     },
//   ];

//   return (
//     <div className="py-12 md:py-20 font-sans bg-white">
//       {sections.map((section, index) => (
//         <AvionSection
//           key={index}
//           title={section.title}
//           description={section.description}
//           imageUrl={section.imageUrl}
//           reverse={section.reverse}
//           linkUrl={section.linkUrl}
//         />
//       ))}
//     </div>
//   );
// };

// export default AvionPage;
