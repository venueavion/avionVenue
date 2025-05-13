import React from 'react';

// Import your images for the grid (ensure paths are correct relative to this file)
import foodImg from '../../assets/images/food.jpg';
import privateHaireImg from '../../assets/images/private-hire.jpg';
import eventsImg from '../../assets/images/events.jpg';
import cinemaImg from '../../assets/images/conference.jpg';
import weddingImg from '../../assets/images/wedding.jpg';
import trainingImgGrid from '../../assets/images/training.jpg';
import partiesImg from '../../assets/images/parties.jpg';

import WelcomePage from '../WelcomePage/WelcomePage';
import GallerySection from '../GallerSection/GallerSection';
import PageLanding from '../PageLanding/PageLanding';

const imageGridData = [
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
    title: 'TRAINING',
    image: trainingImgGrid,
  },
  {
    title: 'PRIVATE HIRE',
    image: cinemaImg,
  },
  {
    title: 'WEDDING',
    image: weddingImg,
  },
];

const landing_title = ' Parties ';
const landing_description =
  'A stunning historic venue in the heart of Sheffield';
const backgroundImage = privateHaireImg;

const PrivateHire = () => {
  const title = ' Private Hire ';
  const description =
    'Private Hire at Our Venue are magical! The splendor of the building - both inside and out has made this beautiful setting one of the most sought after urban venues in the region. Complete with a British garden on the roof terrace for blooms, drinks and photographs, Avion Venue is luxuriously historic with gentle styling and a story behind even the smallest item including of course - bespoke Sheffield cutlery for your wedding feast!';
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

export default PrivateHire;
