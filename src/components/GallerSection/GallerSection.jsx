const GallerySection = ({ items }) => {
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
            <span className="text-white text-xl font-medium uppercase">
              {item.title}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GallerySection;
