import { useState } from 'react';

const images = [
  'https://picsum.photos/1080/1920?random=1',
  'https://picsum.photos/1080/1920?random=2',
  'https://picsum.photos/1080/1920?random=3',
  'https://picsum.photos/1080/1920?random=4',
];

export default function Day4() {
  const [currentIndex, setCurrentIndex] = useState(0);

  function goPrev() {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  function goNext() {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

  function goToIndex(index) {
    setCurrentIndex(index);
  }

  return (
    
    <div className="flex flex-wrap justify-center items-center w-screen h-screen bg-gray-800">
        
      <div className="relative w-full">
      <h1 className="text-3xl font-bold text-center mb-2">SOCIAL CULTURE</h1>
        {/* Carousel images */}
        <div className="overflow-hidden rounded-lg h-[50vh] md:h-96 relative">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Slide ${i + 1}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
                i === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            />
          ))}
        </div>

        {/* Controls */}
        <button
          onClick={goPrev}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-60 rounded-full p-2 hover:bg-opacity-90 shadow"
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          onClick={goNext}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-60 rounded-full p-2 hover:bg-opacity-90 shadow"
          aria-label="Next"
        >
          ›
        </button>

        {/* Indicators */}
        {/* <div className="flex justify-center mt-4 gap-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goToIndex(i)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                i === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
}
