import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
        <p className="text-lg mb-8">Page Not Found</p>
        <a
          href="/"
          className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
