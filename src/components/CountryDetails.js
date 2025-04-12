import React from 'react';

const CountryDetails = ({ country, onBack }) => {
  if (!country) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-blue-800 text-Black rounded hover:bg-blue-700 transition-colors"
        aria-label="Back to country list"
      >
        ← Back to List
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={country.flags.svg}
            alt={`Flag of ${country.name.common}`}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">{country.name.common}</h2>
          <div className="space-y-2">
            <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(', ') || 'N/A'}</p>
            <p><strong>Currencies:</strong> {
              Object.values(country.currencies || {})
                .map(currency => `${currency.name} (${currency.symbol})`)
                .join(', ') || 'N/A'
            }</p>
          </div>
        </div>
      </div>

      {country.maps?.googleMaps && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Location</h3>
          <a
            href={country.maps.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            View on Google Maps
          </a>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
