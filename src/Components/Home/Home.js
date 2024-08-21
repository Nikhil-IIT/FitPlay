import React, { useContext,useEffect, useState } from 'react';
import { FitContext } from '../../Context/FitContext';
import WelcomeSection from '../Welcome/Welcome';

const Home = () => {
  const { foodLog,setFoodLog,setFoodDetails, foodDetails, loading, notification, fetchFoodDetails, addToFoodLog, deleteFromFoodLog } = useContext(FitContext);

  const [search,setSearch]=useState('');

  const isLogExpired = () => {
    const logTimestamp = localStorage.getItem('foodLogTimestamp');
    const now = new Date().getTime();

    if (logTimestamp && now - logTimestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem('foodLog');
      localStorage.removeItem('foodLogTimestamp');
      return true;
    }
    return false;
  };


  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search) {
      fetchFoodDetails(search);
    }
  };

  useEffect(() => {
    if (!isLogExpired()) {
      const savedLog = JSON.parse(localStorage.getItem('foodLog')) || [];
      setFoodLog(savedLog);
    } else {
      setFoodLog([]);
    }
  }, [setFoodLog]);

  return (
    <div className="container mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-10">
        Food Intake Tracker
      </h1>

  
      {notification && (
        <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-800 rounded-lg text-center">
          {notification}
        </div>
      )}

      {foodLog.length < 3 && <WelcomeSection />}

      <form onSubmit={handleSearchSubmit} className="mb-10 flex flex-col sm:flex-row justify-center items-center">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search for food items..."
          className="border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 rounded-lg p-4 w-full sm:w-3/4 lg:w-1/2 mb-4 sm:mb-0 text-lg"
          required
        />
        <button
          type="submit"
          className={`ml-0 sm:ml-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition-transform duration-300 ${
            loading ? 'cursor-not-allowed opacity-50' : 'hover:scale-105'
          }`}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
      </form>

      {foodDetails.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Related Food Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {foodDetails.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 shadow-md hover:shadow-lg rounded-lg p-4 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <img
                  src={item.image || 'https://via.placeholder.com/100'}
                  alt={item.label}
                  className="w-28 h-28 object-cover rounded-full mx-auto mb-4"
                />
                <p className="text-xl font-medium text-center text-gray-800">{item.label}</p>
                <p className="text-sm text-center text-gray-500">Calories: {item.nutrients.ENERC_KCAL.toFixed(2) || 'N/A'} kcal</p>

                <input
                  type="number"
                  placeholder="Serving Size (g)"
                  className="border border-gray-300 rounded-lg p-2 w-full mt-4 text-center"
                  min={1}
                  onChange={(e) =>
                    setFoodDetails((prevDetails) => {
                      const updatedDetails = [...prevDetails];
                      updatedDetails[index].servingSize = e.target.value;
                      return updatedDetails;
                    })
                  }
                />
                <button
                  onClick={() => addToFoodLog(item, item.servingSize || 1)}
                  className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Add to Log
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {foodLog.length > 0 ? (
        <div>
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Your Food Log</h2>
          <ul className="space-y-6">
            {foodLog.map((item, index) => (
              <li key={index} className="bg-white shadow-sm p-6 rounded-lg flex items-center transition hover:shadow-md">
                <img
                  src={item.image || 'https://via.placeholder.com/100'}
                  alt={item.label}
                  className="w-20 h-20 object-cover rounded-lg mr-4"
                />
                <div className="flex-grow">
                  <p className="text-lg font-medium">{item.label}</p>
                  <p className="text-sm text-gray-500">Serving Size: {item.servingSize || 'N/A'}g</p>
                  <p className="text-sm text-gray-500">Calories: {item.nutrients.ENERC_KCAL.toFixed(2) || 'N/A'} kcal</p>
                </div>
                <button
                  onClick={() => deleteFromFoodLog(index)}
                  className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          Your food log is empty. Start tracking your food intake by adding food items!
        </p>
      )}
    </div>
  );
};

export default Home;
