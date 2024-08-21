import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import Motivation from "../Motivation/Motivation";

const Nutrients = () => {
  const [foodLog, setFoodLog] = useState([]);
  const [nutrientTotals, setNutrientTotals] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const [todayGoalValues, setTodayGoalValues] = useState({
    calories: 2000,
    protein: 50,
    carbs: 275,
    fat: 70,
  });

  useEffect(() => {
    const savedLog = JSON.parse(localStorage.getItem('foodLog')) || [];
    setFoodLog(savedLog);

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

    setNutrientTotals(totalNutrients);

    const todayGoals = JSON.parse(localStorage.getItem('todayGoals'));
    if (todayGoals) {
      setTodayGoalValues(todayGoals);
    }
  }, []);

  const recommendedDailyValues = {
    calories: 2000,
    protein: 50,
    carbs: 275,
    fat: 70,
  };

  const chartData = [
    ['Nutrient', 'Amount'],
    ['Protein', nutrientTotals.protein],
    ['Carbs', nutrientTotals.carbs],
    ['Fat', nutrientTotals.fat],
  ];

  const options = {
    title: 'Macronutrient Breakdown',
    is3D: true,
    pieHole: 0.4,
    slices: [
      { color: '#8BC34A' }, // protein
      { color: '#FFCA28' }, // carbs
      { color: '#FF7043' }, // fat
    ],
    legend: { position: 'bottom', alignment: 'center', textStyle: { fontSize: 14 } },
    titleTextStyle: { fontSize: 18, bold: true },
    chartArea: { width: '90%', height: '75%' },
  };

  const calculateProgress = (current, goal) => {
    return Math.min((current / goal) * 100, 100);
  };

  const caloriesProgress = calculateProgress(nutrientTotals.calories, todayGoalValues.calories);
  const proteinProgress = calculateProgress(nutrientTotals.protein, todayGoalValues.protein);
  const carbsProgress = calculateProgress(nutrientTotals.carbs, todayGoalValues.carbs);
  const fatProgress = calculateProgress(nutrientTotals.fat, todayGoalValues.fat);

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Nutrient Tracking</h2>

      <div className="mb-8 p-4 bg-gray-100 rounded-lg shadow-inner">
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">Total Nutrients Consumed</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-lg"><strong>Calories:</strong> {nutrientTotals.calories.toFixed(2)} kcal</p>
            <div className="w-full bg-gray-300 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${calculateProgress(nutrientTotals.calories, recommendedDailyValues.calories)}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-600">Progress vs. Recommended Goal</p>
            <div className="w-full bg-gray-300 rounded-full h-4">
              <div
                className="bg-indigo-600 h-4 rounded-full"
                style={{ width: `${calculateProgress(nutrientTotals.calories, todayGoalValues.calories)}%` }}
              ></div>
            </div>
            <p className="text-sm mt-1">Progress vs. Today Goals</p>
          </div>

          <div>
            <p className="text-lg"><strong>Protein:</strong> {nutrientTotals.protein.toFixed(2)} g</p>
            <div className="w-full bg-gray-300 rounded-full h-4">
              <div
                className="bg-green-600 h-4 rounded-full"
                style={{ width: `${calculateProgress(nutrientTotals.protein, recommendedDailyValues.protein)}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-600">Progress vs. Recommended Goal</p>
            <div className="w-full bg-gray-300 rounded-full h-4">
              <div
                className="bg-indigo-600 h-4 rounded-full"
                style={{ width: `${calculateProgress(nutrientTotals.protein, todayGoalValues.protein)}%` }}
              ></div>
            </div>
            <p className="text-sm mt-1">Progress vs. Today Goals</p>
          </div>

          <div>
            <p className="text-lg"><strong>Carbohydrates:</strong> {nutrientTotals.carbs.toFixed(2)} g</p>
            <div className="w-full bg-gray-300 rounded-full h-4">
              <div
                className="bg-yellow-600 h-4 rounded-full"
                style={{ width: `${calculateProgress(nutrientTotals.carbs, recommendedDailyValues.carbs)}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-600">Progress vs. Recommended Goal</p>
            <div className="w-full bg-gray-300 rounded-full h-4">
              <div
                className="bg-indigo-600 h-4 rounded-full"
                style={{ width: `${calculateProgress(nutrientTotals.carbs, todayGoalValues.carbs)}%` }}
              ></div>
            </div>
            <p className="text-sm mt-1">Progress vs. Today Goals</p>
          </div>

          <div>
            <p className="text-lg"><strong>Fat:</strong> {nutrientTotals.fat.toFixed(2)} g</p>
            <div className="w-full bg-gray-300 rounded-full h-4">
              <div
                className="bg-red-600 h-4 rounded-full"
                style={{ width: `${calculateProgress(nutrientTotals.fat, recommendedDailyValues.fat)}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-600">Progress vs. Recommended Goal</p>
            <div className="w-full bg-gray-300 rounded-full h-4">
              <div
                className="bg-indigo-600 h-4 rounded-full"
                style={{ width: `${calculateProgress(nutrientTotals.fat, todayGoalValues.fat)}%` }}
              ></div>
            </div>
            <p className="text-sm mt-1">Progress vs. Today Goals</p>
          </div>
        </div>
      </div>

      <div className="mb-8 p-4 bg-gray-100 rounded-lg shadow-inner">
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">Today Goal Values: Change From Daily Goals Section</h3>
        <div className="grid grid-cols-2 gap-4">
          <p className="text-lg"><strong>Calories:</strong> {todayGoalValues.calories} kcal</p>
          <p className="text-lg"><strong>Protein:</strong> {todayGoalValues.protein} g</p>
          <p className="text-lg"><strong>Carbohydrates:</strong> {todayGoalValues.carbs} g</p>
          <p className="text-lg"><strong>Fat:</strong> {todayGoalValues.fat} g</p>
        </div>
      </div>
     
      
      <div className="mb-8 p-4 bg-gray-100 rounded-lg shadow-inner">
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">Recommended Daily Intake</h3>
        <div className="grid grid-cols-2 gap-4">
          <p className="text-lg"><strong>Calories:</strong> {recommendedDailyValues.calories} kcal</p>
          <p className="text-lg"><strong>Protein:</strong> {recommendedDailyValues.protein} g</p>
          <p className="text-lg"><strong>Carbohydrates:</strong> {recommendedDailyValues.carbs} g</p>
          <p className="text-lg"><strong>Fat:</strong> {recommendedDailyValues.fat} g</p>
        </div>
      </div>


      <Motivation 
        caloriesProgress={caloriesProgress} 
        proteinProgress={proteinProgress} 
        carbsProgress={carbsProgress} 
        fatProgress={fatProgress} 
      />

      <div className="mb-8">
        <Chart
          chartType="PieChart"
          data={chartData}
          options={options}
          width="100%"
          height="400px"
        />
      </div>
    </div>
  );
};

export default Nutrients;