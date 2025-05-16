import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LoadingPage } from '../../components/LoadingPage/LoadingPage';

const ImageGallery = () => {
  const [gridItems, setGridItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const columnsPerRow = 3;

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/images');
      const formattedData = response.data.map((item) => ({
        id: item.id, // Make sure your API returns an id for each image
        title: item.title || item.filename,
        image: item.path,
      }));
      setGridItems(formattedData.slice(0, 200));
    } catch (err) {
      console.error('Error fetching images:', err);
      setError('Failed to load gallery images');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (imageId) => {
    try {
      await axios.delete(`http://localhost:3000/images/${imageId}`);
      // Remove the deleted image from the state
      setGridItems(gridItems.filter((item) => item.id !== imageId));
    } catch (err) {
      console.error('Error deleting image:', err);
      setError('Failed to delete image');
    }
  };

  if (loading) return <LoadingPage message="Finalizing details..." />;

  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;

  const numRows = Math.ceil(gridItems.length / columnsPerRow);
  const rowIndices = Array.from({ length: numRows }, (_, i) => i);

  return (
    <div className="py-0">
      <table className="border-collapse border-[2px] border-red-0 mx-auto">
        <tbody>
          {rowIndices.map((row) => (
            <tr key={row}>
              {[0, 1, 2].map((col) => {
                const index = row * columnsPerRow + col;
                const item = gridItems[index];

                if (index < gridItems.length) {
                  return (
                    <td
                      key={col}
                      className="
                        border-[1px] border-1
                        w-[230px] h-[50px]
                        p-0
                        overflow-hidden
                        relative
                      "
                    >
                      {item ? (
                        <>
                          <img
                            src={item.image}
                            alt={item.title}
                            className="
                              block
                              w-full h-full
                              object-cover
                            "
                            onLoad={(e) => {
                              e.target.style.width = '230px';
                              e.target.style.height = '150px';
                            }}
                          />
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="
                              absolute
                              top-1 right-1
                              bg-red-500
                              text-white
                              rounded-full
                              w-6 h-6
                              flex items-center justify-center
                              opacity-70 hover:opacity-100
                              transition-opacity
                            "
                            title="Delete image"
                          >
                            {' '}
                            ×
                          </button>
                        </>
                      ) : (
                        <div className="w-full h-full bg-gray-200"></div>
                      )}
                    </td>
                  );
                }
                return null;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ImageGallery;
