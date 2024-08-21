import React from 'react';

const Motivation = ({ caloriesProgress, proteinProgress, carbsProgress, fatProgress }) => {
  const getMotivationalMessage = () => {
    if (caloriesProgress >= 100 && proteinProgress >= 100 && carbsProgress >= 100 && fatProgress >= 100) {
      return "🎉 Great job! You've met your goals! Keep up the hard work!";
    } else if (caloriesProgress >= 80 && proteinProgress >= 80) {
      return "💪 You're almost there! Keep pushing!";
    } else if (caloriesProgress >= 50) {
      return "🔥 Nice! You're halfway through!";
    } else {
      return "🚀 Let's get started! You're capable of greatness!";
    }
  };

  return (
    <div className="p-4 bg-yellow-100 rounded-lg shadow-md mt-6">
      <h3 className="text-xl font-semibold mb-2">I'm Here To Inspire You!</h3>
      <p className="text-lg">{getMotivationalMessage()}</p>
    </div>
  );
};

export default Motivation;
