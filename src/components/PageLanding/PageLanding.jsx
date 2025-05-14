const PageLanding = ({ title, description, backgroundImage }) => {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        ></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1
            // className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter"
            style={{ fontWeight: 800 }}
            className="text-4xl md:text-6xl lg:text-7xl font-normal text-white mb-6 tracking-normal leading-snug uppercase font-serif font-extrabold"
          >
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl font-bold tracking-normal leading-relaxed capitalize">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageLanding;
