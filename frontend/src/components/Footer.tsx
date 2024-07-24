// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <p>© 2024 FLEXIFY. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="/about" className="hover:underline">
            About
          </a>
          <a href="/support" className="hover:underline">
            Support
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
