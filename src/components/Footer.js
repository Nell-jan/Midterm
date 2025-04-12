import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-black fixed bottom-0 left-0 right-0 w-full">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-3 md:mb-0">
            <p className="text-sm md:text-base">
              &copy; {new Date().getFullYear()} Country Explorer App
            </p>
          </div>
        
          
          <p className="text-xs md:text-sm">
            Data provided by REST Countries API
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
