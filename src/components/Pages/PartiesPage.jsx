import React, { useEffect, useState } from 'react';
import axios from 'axios';

import foodImg from '../../assets/images/food.jpg';
import partiesImg from '../../assets/images/parties.jpg';
import eventsImg from '../../assets/images/events.jpg';
import cinemaImg from '../../assets/images/conference.jpg';
import meetingImg from '../../assets/images/meeting.jpg';
import trainingImgGrid from '../../assets/images/training.jpg';

import WelcomePage from '../WelcomePage/WelcomePage';
import GallerySection from '../GallerSection/GallerSection';
import PageLanding from '../PageLanding/PageLanding';
import { LoadingPage } from '../LoadingPage/LoadingPage';

const landingTitle = ' Parties ';
const landingDescription =
  'A stunning historic venue in the heart of Sheffield';

const PartiesPage = () => {
  const [imageGridData, setImageGridData] = useState([]);
  const [landingData, setLandingData] = useState({
    title: ' Parties ',
    description:
      'Parties at Our Venue are magical! The splendor of the building - both inside and out has made this beautiful setting one of the most sought after urban venues in the region. Complete with a British garden on the roof terrace for blooms, drinks and photographs, Avion Venue is luxuriously historic with gentle styling and a story behind even the smallest item including of course - bespoke Sheffield cutlery for your wedding feast!',
    backgroundImage: eventsImg,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    gallery: null,
    landing: null,
  });

  // Default used if API fails
  const defaultImageGridData = [
    { title: 'PARTIES', image: partiesImg },
    { title: 'FOOD', image: foodImg },
    { title: 'EVENTS', image: eventsImg },
    { title: 'TRAINING', image: trainingImgGrid },
    { title: 'CONFERENCE', image: cinemaImg },
    { title: 'UNITY', image: meetingImg },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both endpoints concurrently
        const [galleryResponse, landingResponse] = await Promise.all([
          axios.get('http://localhost:3000/images/category/parties_gallery'),
          axios.get('http://localhost:3000/images/category/parties_dashboard'),
        ]);

        // Process gallery images
        if (galleryResponse.data) {
          const formattedData = galleryResponse.data.map((item, index) => ({
            title:
              item.title ||
              defaultImageGridData[index]?.title ||
              `Image ${index + 1}`,
            image: item.path || defaultImageGridData[index]?.image,
          }));
          setImageGridData(formattedData.slice(0, 6));
        }

        // Process landing page data
        if (landingResponse.data && landingResponse.data.length > 0) {
          const landingItem = landingResponse.data[0]; // Take first item
          setLandingData({
            title: landingItem.title || landingData.title,
            description: landingItem.description || landingData.description,
            backgroundImage: landingItem.path || meetingImg,
          });
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError({
          gallery: 'Failed to load gallery images. Using default content.',
          landing: 'Failed to load landing page data. Using default content.',
        });
        setImageGridData(defaultImageGridData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return <LoadingPage message="Avion is preparing something special.." />;

  return (
    <div className="font-sans text-gray-800">
      {/* Landing Page */}
      {/* {error.landing && (
        <div className="text-center py-2 text-red-500">{error.landing}</div>
      )} */}
      <PageLanding
        title={landingTitle}
        description={landingDescription}
        backgroundImage={landingData.backgroundImage}
      />
      {/* Intro Section */}
      <WelcomePage
        title={landingData.title}
        description={landingData.description}
      />

      {/* Images */}
      {error.gallery && (
        <div className="text-center py-2 text-red-500">{error.gallery}</div>
      )}
      <GallerySection
        items={imageGridData.length ? imageGridData : defaultImageGridData}
      />
    </div>
  );
};

export default PartiesPage;
