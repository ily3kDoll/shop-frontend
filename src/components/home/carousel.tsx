import { useEffect, useState } from "react";

const images = [
  "https://res.cloudinary.com/dmsuwoosx/image/upload/v1733878462/banner02_wv6dzm.png",
  "https://res.cloudinary.com/dmsuwoosx/image/upload/v1733878510/banner03_iojqgw.png",
  "https://res.cloudinary.com/dmsuwoosx/image/upload/v1733878509/banner05_kgptsu.png",
  "https://res.cloudinary.com/dmsuwoosx/image/upload/v1733878508/banner06_k0rr20.png",
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [autoPlay] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (autoPlay) {
      interval = setInterval(() => {
        handleNext();
      }, 10000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoPlay]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    if (isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  return (
    <div className="relative w-full h-[700px] overflow-hidden group">
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Hình ảnh ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              currentIndex === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              currentIndex === index ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(index);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
