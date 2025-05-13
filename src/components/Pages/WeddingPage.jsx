import React, { useEffect, useState } from 'react';
import axios from 'axios';

import foodImg from '../../assets/images/food.jpg';
import churchImg from '../../assets/images/church.jpg';
import eventsImg from '../../assets/images/events.jpg';
import cinemaImg from '../../assets/images/conference.jpg';
import weddingImg from '../../assets/images/wedding.jpg';
import trainingImgGrid from '../../assets/images/trainning.jpg';

import WelcomePage from '../WelcomePage/WelcomePage';
import GallerySection from '../GallerSection/GallerSection';
import PageLanding from '../PageLanding/PageLanding';
import { LoadingPage } from '../LoadingPage/LoadingPage';

const landingTtitle = 'Weddings';
const landingDescription =
  'A stunning historic venue in the heart of Sheffield';

const WeddingPage = () => {
  const [gridItems, setGridItems] = useState([]);
  const [landingData, setLandingData] = useState({
    title: 'Weddings',
    description:
      'Weddings at Our Venue are magical! The splendor of the building - both inside and out has made this beautiful setting one of the most sought after urban venues in the region. Complete with a British garden on the roof terrace for blooms, drinks and photographs, Avion Venue is luxuriously historic with gentle styling and a story behind even the smallest item including of course - bespoke Sheffield cutlery for your wedding feast!',
    backgroundImage: weddingImg,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    gallery: null,
    landing: null,
  });

  // Default data (used if API fails)
  const defaultGridData = [
    { title: 'FOOD', image: foodImg },
    { title: 'DRINKS', image: churchImg },
    { title: 'EVENTS', image: eventsImg },
    { title: 'CINEMA', image: cinemaImg },
    { title: 'WEDDING', image: weddingImg },
    { title: 'TRAINING', image: trainingImgGrid },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both endpoints concurrently
        const [galleryResponse, landingResponse] = await Promise.all([
          axios.get('http://localhost:3000/images/category/wedding_gallery'),
          axios.get('http://localhost:3000/images/category/wedding_dashboard'),
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
          const landingItem = landingResponse.data[0]; // Take first item
          setLandingData({
            title: landingItem.title || landingData.title,
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
      <GallerySection items={gridItems} />
    </div>
  );
};

export default WeddingPage;

// import React from 'react';

// // Import your images for the grid (ensure paths are correct relative to this file)
// import foodImg from '../../assets/images/food.jpg';
// import drinksImg from '../../assets/images/drinks.jpg';
// import eventsImg from '../../assets/images/events.jpg';
// import cinemaImg from '../../assets/images/conference.jpg';
// import weddingImg from '../../assets/images/wedding.jpg';
// import trainingImgGrid from '../../assets/images/trainning.jpg';

// import WelcomePage from '../WelcomePage/WelcomePage';
// import GallerySection from '../GallerSection/GallerSection';
// import PageLanding from '../PageLanding/PageLanding';

// const imageGridData = [
//   {
//     title: 'FOOD',
//     image: foodImg,
//   },
//   {
//     title: 'DRINKS',
//     image: drinksImg,
//   },
//   {
//     title: 'EVENTS',
//     image: eventsImg,
//   },
//   {
//     title: 'CINEMA',
//     image: cinemaImg,
//   },
//   {
//     title: 'WEDDING',
//     image: weddingImg,
//   },
//   {
//     title: 'TRAINING',
//     image: trainingImgGrid,
//   },
// ];

// const landing_title = ' Weddings ';
// const landing_description =
//   'A stunning historic venue in the heart of Sheffield';
// const backgroundImage = weddingImg;

// const WeddingPage = () => {

//   const title = ' Weddings ';
//   const description =
//     'Weddings at Our Venue are magical! The splendor of the building - both inside and out has made this beautiful setting one of the most sought after urban venues in the region. Complete with a British garden on the roof terrace for blooms, drinks and photographs, Avion Venue is luxuriously historic with gentle styling and a story behind even the smallest item including of course - bespoke Sheffield cutlery for your wedding feast!';
//   return (
//     <div className="font-sans text-gray-800">
//       <div id="weddings"></div>
//       {/* Landing Page */}
//       <PageLanding
//         title={landing_title}
//         description={landing_description}
//         backgroundImage={backgroundImage}
//       />
//       {/* Intro Section */}
//       <WelcomePage title={title} description={description} />

//       {/* Images */}
//       <GallerySection items={imageGridData} />
//     </div>
//   );
// };

// export default WeddingPage;
