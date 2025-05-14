import React, { useEffect, useState } from 'react';
import axios from 'axios';

import churchImg from '../../assets/images/church.jpg';
import eventsImg from '../../assets/images/events.jpg';
import cinemaImg from '../../assets/images/conference.jpg';
import weddingImg from '../../assets/images/wedding.jpg';
import trainingImgGrid from '../../assets/images/training.jpg';
import parties from '../../assets/images/parties.jpg';

import WelcomePage from '../WelcomePage/WelcomePage';
import GallerySection from '../GallerSection/GallerSection';
import PageLanding from '../PageLanding/PageLanding';
import { LoadingPage } from '../LoadingPage/LoadingPage';

const landingTtitle = ' Worshipping ';
const landingDescription =
  'A stunning historic venue in the heart of Sheffield';

const WorshipPage = () => {
  const [gridItems, setGridItems] = useState([]);
  const [landingData, setLandingData] = useState({
    title: ' Worshipping ',
    description:
      'Worshipping at Our Venue is magical! The splendor of the building - both inside and out has made this beautiful setting one of the most sought after urban venues in the region.',
    backgroundImage: churchImg,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    gallery: null,
    landing: null,
  });

  // Default data (used if API fails)
  const defaultGridData = [
    { title: 'CHURCH', image: churchImg },
    { title: 'PARTIES', image: parties },
    { title: 'EVENTS', image: eventsImg },
    { title: 'MEETING', image: cinemaImg },
    { title: 'WEDDING', image: weddingImg },
    { title: 'TRAINING', image: trainingImgGrid },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both endpoints concurrently
        const [galleryResponse, landingResponse] = await Promise.all([
          axios.get('http://localhost:3000/images/category/church_gallery'),
          axios.get('http://localhost:3000/images/category/church_dashboard'),
        ]);

        // Process gallery images
        if (galleryResponse.data) {
          const formattedData = galleryResponse.data.map((item, index) => ({
            title:
              item.title ||
              defaultGridData[index]?.title ||
              `Image ${index + 1}`,
            image: item.path || defaultGridData[index]?.image,
          }));
          setGridItems(formattedData.slice(0, 6));
        }

        // Process landing page data
        if (landingResponse.data && landingResponse.data.length > 0) {
          const landingItem = landingResponse.data[0];
          setLandingData({
            title: landingItem.title || 'Worshipping',
            description: landingItem.description || landingData.description,
            backgroundImage: landingItem.path || landingData.backgroundImage,
          });
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError({
          gallery: 'Failed to load gallery images. Using default content.',
          landing: 'Failed to load landing page data. Using default content.',
        });
        setGridItems(defaultGridData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Preparing your worship experience...
  if (loading)
    return <LoadingPage message="Avion is preparing something special.." />;

  return (
    <div className="font-sans text-gray-800">
      {/* Error Messages */}
      {/* {error.landing && (
        <div className="text-center py-2 text-red-500">{error.landing}</div>
      )}
      {error.gallery && (
        <div className="text-center py-2 text-red-500">{error.gallery}</div>
      )} */}

      {/* Landing Page */}
      <PageLanding
        title={landingTtitle}
        description={landingDescription}
        backgroundImage={landingData.backgroundImage}
      />

      {/* Intro Section */}
      <WelcomePage
        title={landingData.title}
        description={landingData.description}
      />

      {/* Gallery Section */}
      <GallerySection items={gridItems.length ? gridItems : defaultGridData} />
    </div>
  );
};

export default WorshipPage;
