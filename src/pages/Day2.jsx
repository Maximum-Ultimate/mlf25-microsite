import { useState } from 'react';

const images = [
  { src: './assets/img/booklet/ISI 15.png', title: 'FORUM' },
  { src: './assets/img/booklet/ISI 18.png', title: 'DINNER' },
  { src: './assets/img/booklet/ISI 19.png', title: 'FORUM' },
  { src: './assets/img/booklet/ISI 17.png', title: 'FORUM' },
];

export default function Day2() {
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
    <div className="flex flex-col items-center h-screen w-screen bg-clear text-white p-4">
      <h1 className="text-2xl font-bold text-center mt-21">{images[currentIndex].title}</h1>
      
      <div className="relative w-full max-w-screen-md flex justify-center items-center -mt-20">
        {/* Image Carousel */}
        <div className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
          {images.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={`Slide ${i + 1}`}
              className={`absolute transition-opacity duration-700 object-contain max-h-full max-w-full ${
                i === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 transition transform active:scale-110 duration-150"
        >
          <img
            src="/assets/img/kiri.webp"
            className="w-4 m-2"
            alt=""
            style={{ filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.7))' }}
          />
        </button>
        <button
          onClick={goNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 transition transform active:scale-110 duration-150"
        >
          <img
            src="/assets/img/kanan.webp"
            className="w-4 m-2"
            alt=""
            style={{ filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.7))' }}
          />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="mt-4 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-1 rounded-full ${
              currentIndex === i ? 'bg-white' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}