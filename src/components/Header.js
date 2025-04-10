import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-700 text-white p-4 shadow-md">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">Country Explorer</h1>
        <p className="text-sm">Discover information about countries around the world</p>
      </div>
    </header>
  );
};

export default Header;