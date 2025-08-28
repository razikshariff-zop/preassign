import React, { useState } from "react";

const slides = [
  { id: 1, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&q=75&fit=crop&w=600" },
  { id: 2, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&q=75&fit=crop&w=600" },
  { id: 3, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&q=75&fit=crop&w=600" },
];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-10">
      <div className="relative h-64 flex justify-center items-center">
        {slides.map((slide, index) => {
          let className = "absolute transition-all duration-500 rounded-lg shadow-lg";
          if (index === current) className += " z-30 scale-100 translate-x-0 opacity-100";
          else if (index === (current + 1) % slides.length)
            className += " z-20 scale-90 translate-x-32 opacity-80";
          else if (index === (current - 1 + slides.length) % slides.length)
            className += " z-20 scale-90 -translate-x-32 opacity-80";
          else className += " z-10 scale-75 opacity-0";

          return (
            <img
              key={slide.id}
              src={slide.image}
              alt={`Slide ${slide.id}`}
              className={className}
              style={{ width: "400px", height: "300px", objectFit: "cover" }}
            />
          );
        })}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-[-30px] -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-100"
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-[-30px] -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-100"
      >
        ▶
      </button>
    </div>
  );
}