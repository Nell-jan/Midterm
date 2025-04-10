import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Country Explorer App</p>
        <p className="text-sm mt-1">Data provided by REST Countries API</p>
      </div>
    </footer>
  );
};

export default Footer;