import React from 'react';
import Img from '../Assets/welcome.jpg';

const WelcomeSection = () => {
  return (
    <div className="bg-blue-100 rounded-lg p-6 text-center shadow-md mb-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Welcome to Your Food Logger</h2>
      <p className="text-gray-700 text-lg mb-6">
        Track your daily food intake effortlessly. Start by searching for food items and add them to your log.
        Stay healthy and reach your goals!
      </p>
      <img 
        src={Img}
        alt="Healthy Eating"
        className="mx-auto mb-4 rounded-lg"
        loading="lazy"
      />
      <p className="text-gray-600">
        Haven't logged anything yet? Search for your first food item to get started!
      </p>
    </div>
  );
};

export default WelcomeSection;
