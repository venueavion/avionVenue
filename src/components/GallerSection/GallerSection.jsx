// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const GallerySection = () => {
//   const [gridItems, setGridItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/images');
//         console.log('API Response:', response.data); // Debugging
//         setGridItems(response.data);
//       } catch (err) {
//         console.error('Error details:', err.response?.data || err.message);
//         setError('Failed to load images. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchImages();
//   }, []);

//   if (loading) return <div className="text-center py-8">Loading images...</div>;
//   if (error)
//     return <div className="text-center py-8 text-red-500">{error}</div>;
//   if (gridItems.length === 0)
//     return <div className="text-center py-8">No images found</div>;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4">
//       {gridItems.map((item) => (
//         <div
//           key={item.id}
//           className="relative h-64 md:h-96 group overflow-hidden rounded-lg shadow-lg"
//         >
//           <img
//             src={item.path}
//             alt={item.title}
//             className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//             onError={(e) => {
//               e.target.src = '/placeholder-image.jpg';
//               e.target.className = 'w-full h-full object-cover bg-gray-200';
//             }}
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//             <div className="text-white">
//               <h3 className="font-bold text-lg">{item.title}</h3>
//               {item.description && (
//                 <p className="text-sm mt-1">{item.description}</p>
//               )}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default GallerySection;

import React from 'react';

const GallerySection = ({ items }) => {
  // I wanna feach images from supabase here

  // and make gridItems = feached images

  const gridItems = items || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 relative bg-white">
      {/* Horizontal grid lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white bg-opacity-30 z-10"></div>
      <div className="absolute top-1/3 left-0 right-0 h-px bg-white bg-opacity-30 z-10 md:hidden"></div>
      <div className="absolute top-2/3 left-0 right-0 h-px bg-white bg-opacity-30 z-10 md:hidden"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white bg-opacity-30 z-10"></div>

      {/* Vertical grid lines */}
      <div className="absolute top-0 bottom-0 left-0 w-px bg-white bg-opacity-30 z-10 md:hidden"></div>
      <div className="absolute top-0 bottom-0 right-0 w-px bg-white bg-opacity-30 z-10 md:hidden"></div>
      <div className="absolute top-0 bottom-0 left-0 w-px bg-white bg-opacity-30 z-10 hidden md:block"></div>
      <div className="absolute top-0 bottom-0 right-0 w-px bg-white bg-opacity-30 z-10 hidden md:block"></div>

      {gridItems.map((item, index) => (
        <div
          key={index}
          className="relative h-64 md:h-96 group overflow-hidden border border-white border-opacity-30"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${item.image})` }}
          ></div>
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-xl font-medium">{item.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GallerySection;
