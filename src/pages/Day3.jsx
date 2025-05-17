import { useState } from 'react';

const images = [
  { src: './assets/img/booklet/ISI 23.png', title: 'AMAZING RACE' },
  { src: './assets/img/booklet/ISI 27B.png', title: 'AMAZING RACE' },
  { src: './assets/img/booklet/ISI 24.png', title: 'AMAZING RACE' },
  { src: './assets/img/booklet/ISI 25.png', title: 'GALA DINNER' },
  { src: './assets/img/booklet/ISI 27B.png', title: 'GALA DINNER' },
  { src: './assets/img/booklet/ISI 26.png', title: 'GALA DINNER' },
  { src: './assets/img/booklet/Layer 1.png', title: '' }, // special
  { src: './assets/img/booklet/ISI 22.png', title: 'AMAZING RACE' },
];

export default function Day2() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = images[currentIndex];
  const isSpecial = current.title === '';

  function goPrev() {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  function goNext() {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

  return (
    <div className="flex flex-col items-center h-screen w-screen bg-clear text-white p-4 relative overflow-hidden">
      {!isSpecial && (
        <h1 className="text-2xl font-bold text-center mt-20 mb-4">{current.title}</h1>
      )}

      <div className="relative w-full max-w-screen-md flex justify-center items-center flex-1">
        {/* Image Carousel */}
        <div className={`relative w-full ${isSpecial ? 'h-screen' : 'h-[85vh]'} flex items-center justify-center overflow-hidden`}>
          {images.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={`Slide ${i + 1}`}
              className={`absolute transition-opacity duration-700 ${
                i === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none '
              } ${isSpecial ? 'object-contain w-screen h-screen ' : 'object-contain max-h-full max-w-full -mt-40'}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 transition transform active:scale-110 duration-150 z-10"
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
          className="absolute right-0 top-1/2 -translate-y-1/2 transition transform active:scale-110 duration-150 z-10"
        >
          <img
            src="/assets/img/kanan.webp"
            className="w-4 m-2"
            alt=""
            style={{ filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.7))' }}
          />
        </button>

        {/* Special download button */}
        {isSpecial && (
          <a
            href="/assets/file/YourFile.pdf"
            download
            className="absolute bottom-24 px-5 py-2 rounded-lg shadow-lg text-white font-semibold bg-gradient-to-b from-yellow-400 via-amber-400 to-yellow-500 hover:opacity-90 transition"

          >
            DOWNLOAD TEAM
          </a>
        )}
      </div>

      {/* Slide Indicators */}
      <div className="mb-20 -mt-30 flex gap-2">
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