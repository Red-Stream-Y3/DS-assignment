import React, { useState, useEffect } from "react";

function Hero() {
  const images = [
    "https://images.unsplash.com/photo-1566813892186-684105970991?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1624454002302-36b824d7bd0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1617191880520-c6a69e04fa75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1547318114-eff5ea85ede9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const handleNextClick = () => {
    setIsFading(true);
    setTimeout(() => {
      const newIndex = (currentImage + 1) % images.length;
      setCurrentImage(newIndex);
      setIsFading(false);
    }, 300);
  };

  const handlePrevClick = () => {
    setIsFading(true);
    setTimeout(() => {
      const newIndex = (currentImage - 1 + images.length) % images.length;
      setCurrentImage(newIndex);
      setIsFading(false);
    }, 300);
  };

  const imageStyle = {
    opacity: isFading ? 0 : 1,
    transition: "opacity 0.5s ease-out",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, 5000); // slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentImage]);


  return (
    <div className="w-full h-80 relative">
      <img
        src={images[currentImage]}
        alt={`Promotion ${currentImage + 1}`}
        className="w-full h-full object-cover"
        style={imageStyle}
      />
      <button
        className="absolute top-1/2 transform -translate-y-1/2 left-0 bg-black bg-opacity-30 text-opacity-70 text-white py-2 px-4 rounded-r-lg"
        onClick={handlePrevClick}
      >
        Previous
      </button>
      <button
        className="absolute top-1/2 transform -translate-y-1/2 right-0 bg-black bg-opacity-30 text-opacity-70 text-white py-2 px-4 rounded-l-lg"    
        onClick={handleNextClick}
      >
        Next
    </button>
    </div>
    );
}

export default Hero;
