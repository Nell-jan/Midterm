import React from 'react';

const CountryDetails = ({ country, onBack }) => {
  if (!country) {
    return null;
  }

  // Format population with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Get languages as array
  const languages = country.languages ? Object.values(country.languages) : [];
  
  // Get currencies
  const currencies = country.currencies ? Object.values(country.currencies)
    .map(currency => `${currency.name} (${currency.symbol || ''})`).join(', ') : 'N/A';

  return (
    <div className="p-4">
      <button 
        onClick={onBack}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        ← Back to Country List
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6 flex justify-center">
              <img 
                src={country.flags.svg || country.flags.png} 
                alt={`Flag of ${country.name.common}`}
                className="w-full max-w-xs h-auto object-cover shadow-md"
              />
            </div>
            
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-4">{country.name.common}</h2>
              <p className="text-xl mb-2">
                <span className="font-semibold">Official Name:</span> {country.name.official}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="mb-2"><span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
                  <p className="mb-2"><span className="font-semibold">Region:</span> {country.region}</p>
                  <p className="mb-2"><span className="font-semibold">Subregion:</span> {country.subregion || 'N/A'}</p>
                  <p className="mb-2"><span className="font-semibold">Population:</span> {formatNumber(country.population)}</p>
                </div>
                
                <div>
                  <p className="mb-2"><span className="font-semibold">Currencies:</span> {currencies}</p>
                  <p className="mb-2">
                    <span className="font-semibold">Languages:</span> {languages.length > 0 ? languages.join(', ') : 'N/A'}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Area:</span> {formatNumber(country.area)} km²
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Time Zones:</span> {country.timezones.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {country.maps?.googleMaps && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Maps</h3>
              <a 
                href={country.maps.googleMaps} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View on Google Maps
              </a>
            </div>
          )}
          
          {country.borders && country.borders.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Bordering Countries</h3>
              <div className="flex flex-wrap gap-2">
                {country.borders.map(border => (
                  <span key={border} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                    {border}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;