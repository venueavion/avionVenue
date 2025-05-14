import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AvionSection from '../AvionSection/AvionSection';

// Import fallback images
import meetingsImg from '../../assets/images/meeting.jpg';
import diningImg from '../../assets/images/dining.jpg';
import roofImg from '../../assets/images/trainning.jpg';
import { LoadingPage } from '../LoadingPage/LoadingPage';

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
    return <LoadingPage message="Avion is preparing something special.." />;

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
