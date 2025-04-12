import React from 'react';

const Header = ({ onSearch }) => {
  return (
    <header className="bg-blue-800 text-black shadow-md fixed top-0 w-full z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center h-16">
          {/* Title */}
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold">Visualizing Country Information</h1>
          </div>

          {/* Search Bar */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search for a country..."
                onChange={(e) => onSearch(e.target.value)}
                className="w-full px-4 py-2 rounded-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Search countries"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
