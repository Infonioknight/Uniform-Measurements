import { useState } from 'react';

export const ProductImageCarousel = ({ image }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % image.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + image.length) % image.length);
  };

  // console.log('IMAGE ERROR', image); // To see the format of image being uploaded.

  return (
    <div className="relative">
      <img src={image[currentImageIndex]} className="rounded-lg w-full h-auto" />
      <button onClick={prevImage} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full">
        &#8592;
      </button>
      <button onClick={nextImage} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full">
        &#8594;
      </button>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex space-x-2">
        {image.map((_, index) => (
          <div key={index} className={`h-2 w-2 rounded-full ${index === currentImageIndex ? 'bg-blue-500' : 'bg-white'}`}></div>
        ))}
      </div>
    </div>
  );
};
