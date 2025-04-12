import React from 'react';

const CountryCard = ({ country, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{country.name.common}</h2>
        <div className="space-y-1">
          <p><span className="font-medium">Population:</span> {country.population.toLocaleString()}</p>
          <p><span className="font-medium">Region:</span> {country.region}</p>
          <p><span className="font-medium">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
