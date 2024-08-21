import React, { useState, useEffect } from 'react';

const DailyGoals = () => {
  const [goals, setGoals] = useState({
    calories: 2000,
    protein: 50,
    carbs: 275,
    fat: 70,
  });

  const [intake, setIntake] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  const [todayGoals, setTodayGoals] = useState(null);

  useEffect(() => {
    const savedGoals = JSON.parse(localStorage.getItem('dailyGoals')) || {
      calories: 2000,
      protein: 50,
      carbs: 275,
      fat: 70,
    };
    setGoals(savedGoals);

    const savedLog = JSON.parse(localStorage.getItem('foodLog')) || [];
    const totalNutrients = savedLog.reduce(
      (totals, item) => {
        const servingMultiplier = item.servingSize;
        totals.calories += item.nutrients.ENERC_KCAL * servingMultiplier;
        totals.protein += item.nutrients.PROCNT * servingMultiplier;
        totals.carbs += item.nutrients.CHOCDF * servingMultiplier;
        totals.fat += item.nutrients.FAT * servingMultiplier;
        return totals;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    setIntake(totalNutrients);

    const savedTodayGoals = JSON.parse(localStorage.getItem('todayGoals'));
    if (savedTodayGoals) {
      setTodayGoals(savedTodayGoals);
    }
  }, []);

  const handleGoalChange = (e) => {
    const { name, value } = e.target;
    setGoals((prevGoals) => ({
      ...prevGoals,
      [name]: parseFloat(value),
    }));
  };

  const saveGoals = () => {
    localStorage.setItem('dailyGoals', JSON.stringify(goals));
    localStorage.setItem('todayGoals', JSON.stringify(goals));
    setTodayGoals(goals);
    alert('Goals saved successfully!');
  };

  const getRecommendations = () => {
    const recommendations = [];

    if (intake.calories < goals.calories) {
      recommendations.push('Increase your calorie intake to meet your daily goal.');
    } else if (intake.calories > goals.calories) {
      recommendations.push('You have exceeded your calorie goal. Consider adjusting your intake.');
    }

    if (intake.protein < goals.protein) {
      recommendations.push('Increase your protein intake to reach your goal.');
    }

    if (intake.carbs > goals.carbs) {
      recommendations.push('Your carbohydrate intake exceeds the daily goal.');
    }

    if (intake.fat > goals.fat) {
      recommendations.push('Your fat intake exceeds the daily goal.');
    }

    return recommendations.length > 0 ? recommendations : ['You are on track with your nutritional goals!'];
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-4xl font-bold mb-8 text-gray-700 text-center">Set Your Daily Nutritional Goals</h2>

      <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-sm">
        <h3 className="text-2xl font-semibold mb-4 text-gray-600">Set Today Goals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600 font-medium mb-2">Calories (kcal):</label>
            <input
              type="number"
              name="calories"
              value={goals.calories}
              onChange={handleGoalChange}
              min={0}
              className="border border-gray-300 rounded-lg p-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2">Protein (g):</label>
            <input
              type="number"
              name="protein"
              value={goals.protein}
              onChange={handleGoalChange}
              min={0}
              className="border border-gray-300 rounded-lg p-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2">Carbohydrates (g):</label>
            <input
              type="number"
              name="carbs"
              value={goals.carbs}
              onChange={handleGoalChange}
              min={0}
              className="border border-gray-300 rounded-lg p-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2">Fat (g):</label>
            <input
              type="number"
              name="fat"
              value={goals.fat}
              onChange={handleGoalChange}
              min={0}
              className="border border-gray-300 rounded-lg p-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          onClick={saveGoals}
          className="mt-6 w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Save Goals
        </button>
      </div>

      {todayGoals && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold mb-4 text-gray-600">Today's Goals</h3>
          <p>Calories: {todayGoals.calories} kcal</p>
          <p>Protein: {todayGoals.protein} g</p>
          <p>Carbohydrates: {todayGoals.carbs} g</p>
          <p>Fat: {todayGoals.fat} g</p>
        </div>
      )}

      <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-sm">
        <h3 className="text-2xl font-semibold mb-4 text-gray-600">Your Current Intake</h3>
        <p>Calories: {intake.calories.toFixed(2)} kcal</p>
        <p>Protein: {intake.protein.toFixed(2)} g</p>
        <p>Carbohydrates: {intake.carbs.toFixed(2)} g</p>
        <p>Fat: {intake.fat.toFixed(2)} g</p>
      </div>

      <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
        <h3 className="text-2xl font-semibold mb-4 text-gray-600">Personalized Recommendations</h3>
        <ul className="list-disc ml-5 text-gray-600">
          {getRecommendations().map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DailyGoals;
