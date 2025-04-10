import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import CountryDetails from './components/CountryDetails';
import Search from './components/Search';
import RegionFilter from './components/RegionFilter';

function App() {
    const axios = require('axios');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://nationnode.vercel.app/all');
        setCountries(response.data);
        setFilteredCountries(response.data);
        
        // Find Afghanistan as the default selected country
        const afghanistan = response.data.find(country => 
          country.name.common === 'Afghanistan');
        
        setSelectedCountry(afghanistan);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch country data');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    // Filter countries based on search term and region
    let results = countries;
    
    if (searchTerm) {
      results = results.filter(country => 
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedRegion) {
      results = results.filter(country => 
        country.region === selectedRegion
      );
    }
    
    setFilteredCountries(results);
  }, [searchTerm, selectedRegion, countries]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  const handleBorderCountryClick = async (borderCode) => {
    try {
      const response = await axios.get(`https://nationnode.vercel.app/alpha/${borderCode}`);
      setSelectedCountry(response.data);
    } catch (err) {
      console.error('Error fetching border country:', err);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <div className="filters">
          <Search onSearch={handleSearch} />
          <RegionFilter onRegionChange={handleRegionChange} />
        </div>
        
        <div className="countries-container">
          <div className="country-list">
            <h2>Countries</h2>
            <ul>
              {filteredCountries.map(country => (
                <li 
                  key={country.cca3} 
                  onClick={() => handleCountrySelect(country)}
                  className={selectedCountry && country.cca3 === selectedCountry.cca3 ? 'active' : ''}
                >
                  {country.name.common}
                </li>
              ))}
            </ul>
          </div>
          
          {selectedCountry && (
            <CountryDetails 
              country={selectedCountry} 
              onBorderClick={handleBorderCountryClick} 
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;