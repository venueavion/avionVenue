import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GallerySection from '../GallerSection/GallerSection';

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
    return <div className="text-center py-8">Loading gallery...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div>
      <GallerySection items={gridItems} />
    </div>
  );
};

export default GalleryPage;

// // src/pages/GalleryPage/GalleryPage.js (or your preferred path for page components)
// import React from 'react';
// import GallerySection from '../GallerSection/GallerSection'; // Adjust path to your GallerySection component

// // Import your images for the grid (ensure paths are correct relative to this file)
// import foodImg from '../../assets/images/food.jpg';
// import churchImg from '../../assets/images/church.jpg';
// import eventsImg from '../../assets/images/events.jpg';
// import privateHireImg from '../../assets/images/private-hire.jpg';
// import weddingImg from '../../assets/images/wedding.jpg';
// import trainingImgGrid from '../../assets/images/training.jpg'; // Renamed to avoid naming conflict if 'trainningImg' from AvionPage is in the same scope

// const GalleryPage = () => {
//   const imageGridData = [
//     {
//       title: 'PRIVATE HIRE',
//       image: privateHireImg,
//     },

//     {
//       title: 'WORSHIPPING',
//       image: churchImg,
//     },
//     {
//       title: 'TRAINING', // Corrected typo from 'TRAINNING'
//       image: trainingImgGrid,
//     },
//     {
//       title: 'FOOD',
//       image: foodImg, // Use imported image variable
//     },
//     {
//       title: 'EVENTS',
//       image: eventsImg,
//     },

//     {
//       title: 'WEDDING',
//       image: weddingImg,
//     },
//   ];

//   return (
//     // You can wrap this in a section with appropriate styling, similar to AvionPage's wrapper
//     <div>
//       <GallerySection items={imageGridData} />
//     </div>
//   );
// };

// export default GalleryPage;
