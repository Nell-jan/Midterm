import React from 'react';

const FilterDropdowns = ({ onRegionChange, onPopulationChange }) => {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 mb-8 px-4">
      {/* Region Filter */}
      <div className="relative">
        <select
          onChange={(e) => onRegionChange(e.target.value)}
          className="w-full md:w-48 p-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          aria-label="Filter by region"
        >
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      {/* Population Filter */}
      <div className="relative">
        <select
          onChange={(e) => onPopulationChange(e.target.value)}
          className="w-full md:w-48 p-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          aria-label="Filter by population"
        >
          <option value="">Filter by Population</option>
          <option value="0-1M">Less than 1M</option>
          <option value="1M-10M">1M - 10M</option>
          <option value="10M-50M">10M - 50M</option>
          <option value="50M-100M">50M - 100M</option>
          <option value="100M+">More than 100M</option>
        </select>
      </div>
    </div>
  );
};

export default FilterDropdowns;
