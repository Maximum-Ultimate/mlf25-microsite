import { useState } from 'react';

const images = [
  './assets/img/booklet/ISI 10.png',
  './assets/img/booklet/ISI 11.png',
  // Add more images here
];

export default function Day1() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goPrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const goNext = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="flex flex-col items-center h-screen w-screen bg-clear text-white p-4">
      <h1 className="text-2xl font-bold text-center mt-21">WELCOME DINNER</h1>
      <div className="relative w-full max-w-screen-md flex justify-center items-center -mt-20">
        {/* Image Carousel */}
        <div className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
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
          <img src="/assets/img/kiri.webp" className="w-4 m-2" alt="" style={{
    filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.7))',
  }} />
        </button>
        <button
          onClick={goNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 transition transform active:scale-110 duration-150  "
        >
          <img src="/assets/img/kanan.webp" className="w-4 m-2" alt="" style={{
    filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.7))',
  }} />
        </button>
      </div>
      {/* Optional Slide Indicators */}
      <div className="mt-4 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === i ? 'bg-white' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}