import React from 'react';

// Import your images for the grid (ensure paths are correct relative to this file)
import foodImg from '../../assets/images/food.jpg';
import partiesImg from '../../assets/images/parties.jpg';
import eventsImg from '../../assets/images/events.jpg';
import worshipImg from '../../assets/images/church.jpg';
import weddingImg from '../../assets/images/wedding.jpg';
import trainingImgGrid from '../../assets/images/training.jpg';

import WelcomePage from '../WelcomePage/WelcomePage';
import GallerySection from '../GallerSection/GallerSection';
import PageLanding from '../PageLanding/PageLanding';

const imageGridData = [
  {
    title: 'TRAINING',
    image: trainingImgGrid,
  },
  {
    title: 'WORSHIP',
    image: worshipImg,
  },
  {
    title: 'FOOD',
    image: foodImg,
  },
  {
    title: 'PARTIES',
    image: partiesImg,
  },
  {
    title: 'EVENTS',
    image: eventsImg,
  },

  {
    title: 'WEDDING',
    image: weddingImg,
  },
];

const landing_title = ' Trainings ';
const landing_description =
  'A stunning historic venue in the heart of Sheffield';
const backgroundImage = trainingImgGrid;

const TrainingPage = () => {
  const title = ' Trainings ';
  const description =
    'Trainings at Our Venue are magical! The splendor of the building - both inside and out has made this beautiful setting one of the most sought after urban venues in the region. Complete with a British garden on the roof terrace for blooms, drinks and photographs, Avion Venue is luxuriously historic with gentle styling and a story behind even the smallest item including of course - bespoke Sheffield cutlery for your wedding feast!';
  return (
    <div className="font-sans text-gray-800">
      {/* Landing Page */}
      <PageLanding
        title={landing_title}
        description={landing_description}
        backgroundImage={backgroundImage}
      />
      {/* Intro Section */}
      <WelcomePage title={title} description={description} />

      {/* Images */}
      <GallerySection items={imageGridData} />
    </div>
  );
};

export default TrainingPage;
