import React, { useState, useEffect } from 'react';

const CountryList = ({ onSelectCountry }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        // Sort countries alphabetically by name
        const sortedData = data.sort((a, b) => {
          return a.name.common.localeCompare(b.name.common);
        });
        setCountries(sortedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching country data:', error);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Filter countries based on search term
  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center p-4">Loading countries...</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for a country..."
          className="w-full p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCountries.map(country => (
          <div 
            key={country.cca3} 
            className="border rounded shadow hover:shadow-lg cursor-pointer transition-shadow"
            onClick={() => onSelectCountry(country)}
          >
            <div className="h-32 overflow-hidden">
              <img 
                src={country.flags.png} 
                alt={`Flag of ${country.name.common}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2">
              <h3 className="font-semibold truncate">{country.name.common}</h3>
              <p className="text-sm text-gray-600">
                {country.region}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {filteredCountries.length === 0 && (
        <div className="text-center p-4">No countries found matching your search.</div>
      )}
    </div>
  );
};

export default CountryList;