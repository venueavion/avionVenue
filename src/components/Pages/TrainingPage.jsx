import React, { useEffect, useState } from 'react';
import axios from 'axios';

import foodImg from '../../assets/images/food.jpg';
import partiesImg from '../../assets/images/parties.jpg';
import eventsImg from '../../assets/images/events.jpg';
import worshipImg from '../../assets/images/church.jpg';
import meetingImg from '../../assets/images/meeting.jpg';
import trainingImgGrid from '../../assets/images/training.jpg';

import WelcomePage from '../WelcomePage/WelcomePage';
import GallerySection from '../GallerSection/GallerSection';
import PageLanding from '../PageLanding/PageLanding';
import { LoadingPage } from '../LoadingPage/LoadingPage';

const landingTtitle = ' Trainings ';
const landingDescription =
  'A stunning historic venue in the heart of Sheffield';

const TrainingPage = () => {
  const [imageGridData, setImageGridData] = useState([]);
  const [landingData, setLandingData] = useState({
    title: ' Trainings ',
    description:
      'Trainings at Our Venue are magical! The splendor of the building - both inside and out has made this beautiful setting one of the most sought after urban venues in the region.',
    backgroundImage: trainingImgGrid,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    gallery: null,
    landing: null,
  });

  // Default data if API fails
  const defaultImageGridData = [
    { title: 'TRAINING', image: trainingImgGrid },
    { title: 'WORSHIP', image: worshipImg },
    { title: 'FOOD', image: foodImg },
    { title: 'PARTIES', image: partiesImg },
    { title: 'EVENTS', image: eventsImg },
    { title: 'MEETING', image: meetingImg },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both endpoints concurrently
        const [galleryResponse, landingResponse] = await Promise.all([
          axios.get('http://localhost:3000/images/category/training_gallery'),
          axios.get('http://localhost:3000/images/category/training_dashboard'),
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
        if (landingResponse.data?.length > 0) {
          const landingItem = landingResponse.data[0];
          setLandingData({
            title: landingItem.title || 'Trainings',
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
      {error.landing && (
        <div className="text-center py-2 text-red-500">{error.landing}</div>
      )}
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

export default TrainingPage;
