import React, { useEffect, useState } from "react";

const slides = [
  {
    title: "Welcome to Our App",
    description: "Build modern apps with React & Tailwind CSS",
    bg: "from-green-500 to-emerald-600",
  },
  {
    title: "Fast & Secure",
    description: "Optimized performance with strong security",
    bg: "from-blue-500 to-indigo-600",
  },
  {
    title: "Fully Responsive",
    description: "Perfect experience on all devices",
    bg: "from-purple-500 to-pink-600",
  },
];

const Home = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="w-full">
      {/* ================= CAROUSEL ================= */}
      <div className="relative w-full h-100 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700
              ${index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
          >
            <div
              className={`w-full h-full bg-linear-to-r ${slide.bg} flex items-center justify-center text-white`}
            >
              <div className="text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white px-4 py-2 rounded-full"
        >
          ❮
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white px-4 py-2 rounded-full"
        >
          ❯
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${
                index === current ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Build Faster. Build Smarter.
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            A modern platform to build secure, scalable, and high-performance
            web applications using React and Tailwind CSS.
          </p>

          <div className="flex justify-center gap-4">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded">
              Get Started
            </button>
            <button className="border border-green-500 text-green-500 hover:bg-green-50 px-6 py-3 rounded">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* ================= CARDS SECTION ================= */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="bg-white shadow rounded-lg p-6 text-center hover:shadow-lg transition">
            <div className="text-green-500 text-4xl mb-3">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Fast Performance</h3>
            <p className="text-gray-600">
              Optimized rendering and smooth user experience.
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-6 text-center hover:shadow-lg transition">
            <div className="text-green-500 text-4xl mb-3">🔒</div>
            <h3 className="text-xl font-semibold mb-2">Secure</h3>
            <p className="text-gray-600">
              Built with security best practices in mind.
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-6 text-center hover:shadow-lg transition">
            <div className="text-green-500 text-4xl mb-3">📱</div>
            <h3 className="text-xl font-semibold mb-2">Responsive</h3>
            <p className="text-gray-600">
              Looks great on mobile, tablet, and desktop devices.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
