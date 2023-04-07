import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <FaSpinner className="animate-spin text-4xl" />
      <span className="ml-4">Loading...</span>
    </div>
  );
};

export default Loader;
