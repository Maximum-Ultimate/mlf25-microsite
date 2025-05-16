import { useState } from 'react';

const sections = [
  {
    title: 'AMAZING RACE',
    images: [
      'https://picsum.photos/1080/1920?random=19',
      'https://picsum.photos/1080/1900?random=22', // Button shows here
      'https://picsum.photos/1080/1920?random=23',
      'https://picsum.photos/1080/1920?random=25',
    ],
  },
  {
    title: 'GALA DINNER',
    images: [
      'https://picsum.photos/1080/1920?random=26',
      'https://picsum.photos/1080/1920?random=27',
      'https://picsum.photos/1080/1920?random=28',
      'https://picsum.photos/1080/1920?random=29',
    ],
  },
];

export default function Day3() {
  const [currentTab, setCurrentTab] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const currentSection = sections[currentTab];
  const images = currentSection.images;

  const goImagePrev = () => {
    setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goImageNext = () => {
    setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleTabClick = (index) => {
    setCurrentTab(index);
    setImageIndex(0); // reset carousel when tab changes
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-gray-900 text-white px-4">
      
      {/* Title Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        {sections.map((section, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`px-4 py-2 rounded-t-md font-medium transition ${
              currentTab === index
                ? 'bg-white text-gray-100'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            {section.title}
          </button>
        ))}
      </div>

      {/* Title Heading */}
      <h1 className="text-3xl font-bold mb-4">{currentSection.title}</h1>

      {/* Image Carousel */}
      <div className="relative w-full max-w-2xl">
        <div className="overflow-hidden rounded-lg h-96 relative">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Slide ${i + 1}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
                i === imageIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            />
          ))}
        </div>

        {/* Image controls */}
        <button
          onClick={goImagePrev}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white text-xl rounded-full p-2 hover:bg-opacity-90"
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          onClick={goImageNext}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white text-xl rounded-full p-2 hover:bg-opacity-90"
          aria-label="Next"
        >
          ›
        </button>
      </div>

      {/* Conditional Button for Amazing Race at Image Index 1 */}
      {currentTab === 0 && imageIndex === 1 && (
        <div className="mt-4">
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow">
            Special Action Button
          </button>
        </div>
      )}
    </div>
  );
}
