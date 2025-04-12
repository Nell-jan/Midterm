import React, { useState, useEffect } from 'react';
import FilterDropdowns from './components/FilterDropdowns';
import LoadingState from './components/LoadingState';
import EmptyState from './components/EmptyState';
import Header from './components/Header';
import Footer from './components/Footer';
import CountryCard from './components/CountryCard';
import CountryDetails from './components/CountryDetails';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedPopulation, setSelectedPopulation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filterCountries = (region, population, search) => {
    let filtered = [...countries];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(country => 
        country.name.common.toLowerCase().includes(searchLower) ||
        country.region.toLowerCase().includes(searchLower) ||
        (country.capital && country.capital[0].toLowerCase().includes(searchLower))
      );
    }

    // Region filter
    if (region) {
      filtered = filtered.filter(country => country.region === region);
    }

    // Population filter
    if (population) {
      filtered = filtered.filter(country => {
        const pop = country.population;
        switch (population) {
          case '0-1M':
            return pop < 1000000;
          case '1M-10M':
            return pop >= 1000000 && pop < 10000000;
          case '10M-50M':
            return pop >= 10000000 && pop < 50000000;
          case '50M-100M':
            return pop >= 50000000 && pop < 100000000;
          case '100M+':
            return pop >= 100000000;
          default:
            return true;
        }
      });
    }

    setFilteredCountries(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterCountries(selectedRegion, selectedPopulation, query);
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    filterCountries(region, selectedPopulation, searchQuery);
  };

  const handlePopulationChange = (population) => {
    setSelectedPopulation(population);
    filterCountries(selectedRegion, population, searchQuery);
  };

  const resetFilters = () => {
    setSelectedRegion('');
    setSelectedPopulation('');
    setSearchQuery('');
    setFilteredCountries(countries);
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const handleBackToList = () => {
    setSelectedCountry(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onSearch={handleSearch} />
      <main className="container mx-auto px-4 py-24"> {/* Increased top padding */}
        {selectedCountry ? (
          <CountryDetails 
            country={selectedCountry} 
            onBack={handleBackToList}
          />
        ) : (
          <>
            <div className="mb-6">
              <FilterDropdowns
                onRegionChange={handleRegionChange}
                onPopulationChange={handlePopulationChange}
              />
              {(selectedRegion || selectedPopulation || searchQuery) && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-red-600 text-black rounded-lg hover:bg-red-700 transition-colors"
                    aria-label="Reset filters"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>

            {loading ? (
              <LoadingState />
            ) : filteredCountries.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCountries.map(country => (
                  <CountryCard
                    key={country.cca3}
                    country={country}
                    onClick={() => handleCountryClick(country)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
