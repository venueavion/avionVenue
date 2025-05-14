import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GallerySection from '../GallerSection/GallerSection';
import { LoadingPage } from '../LoadingPage/LoadingPage';

const GalleryPage = () => {
  const [gridItems, setGridItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

        setGridItems(formattedData);
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Failed to load gallery images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading)
    return <LoadingPage message="Avion is preparing something special.." />;

  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div>
      <GallerySection items={gridItems} />
    </div>
  );
};

export default GalleryPage;
