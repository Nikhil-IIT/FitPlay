import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t mt-8 w-full">
      <div 
        className="container mx-auto p-4 flex flex-col md:flex-row justify-between items-center"
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.85)', 
          color: '#fff', 
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(5px)',
          padding: '1rem 2rem'
        }}
      >
        <p className="mb-2 md:mb-0 text-center md:text-left flex items-center">
          <span>🔥</span>
          <span className="ml-2">Design & Made With Fire by </span>
          <a 
            href="https://www.linkedin.com/in/nikhil0101786/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-400 ml-1 hover:underline"
          >
            NIKHIL
          </a>
        </p>
        <p className="mb-0 text-center md:text-right md:ml-auto">
          &copy; 2024 Fit Play. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
