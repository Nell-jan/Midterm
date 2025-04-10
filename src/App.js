import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CountryDetails from './components/CountryDetails';
import CountryList from './components/CountryList';
import './App.css';

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setSelectedCountry(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto flex-grow my-4">
        {selectedCountry ? (
          <CountryDetails 
            country={selectedCountry} 
            onBack={handleBackToList} 
          />
        ) : (
          <CountryList onSelectCountry={handleSelectCountry} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;