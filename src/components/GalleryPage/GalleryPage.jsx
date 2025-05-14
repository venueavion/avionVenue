import React, { useEffect, useState } from 'react';
import axios from 'axios';

import foodImg from '../../assets/images/food.jpg';
import privateHaireImg from '../../assets/images/private-hire.jpg';
import cinemaImg from '../../assets/images/conference.jpg';
import weddingImg from '../../assets/images/wedding.jpg';
import trainingImgGrid from '../../assets/images/training.jpg';
import partiesImg from '../../assets/images/parties.jpg';

import GallerySection from '../GallerSection/GallerSection';
import { LoadingPage } from '../LoadingPage/LoadingPage';

const GalleryPage = () => {
  const [galleryImageItems, setGalleryImageItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Default data (used if API fails)
  const defaultGalleryData = [
    { title: 'FOOD', image: foodImg },
    { title: 'PARTIES', image: partiesImg },
    { title: 'EVENTS', image: cinemaImg },
    { title: 'TRAINING', image: trainingImgGrid },
    { title: 'PRIVATE HIRE', image: privateHaireImg },
    { title: 'WEDDING', image: weddingImg },
  ];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Define the types you want to fetch which is comma-separated
        const types =
          'training_dashboard,parties_dashboard,church_dashboard,wedding_dashboard,privateHire_dashboard,church_gallery';
        // Add limit parameter to your API call
        const response = await axios.get(
          `http://localhost:3000/images/getOneImagePerType/types?types=${types}`
        );
        //  like pass the url as an argument for the fetchimage function
        // Transform the API data and limit to 6 items
        const formattedData = response.data
          .slice(0, 6) // Ensure only 6 items even if API returns more
          .map((item) => ({
            title: item.title || item.filename,
            image: item.path, // Using the Supabase URL from your backend
          }));

        setGalleryImageItems(formattedData);
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Failed to load gallery images. Using default content.....');
        setGalleryImageItems(defaultGalleryData);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading)
    return <LoadingPage message="Avion is preparing something special.." />;
  return (
    <div className="font-sans text-gray-800">
      <GallerySection
        items={
          galleryImageItems.length ? galleryImageItems : defaultGalleryData
        }
      />
    </div>
  );
};

export default GalleryPage;
