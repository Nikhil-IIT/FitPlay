import React, { createContext, useState } from 'react';
import axios from 'axios';

export const FitContext = createContext(null);

export const FitContextProvider = (props) => {
  const [foodLog, setFoodLog] = useState([]);
  const [foodDetails, setFoodDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState('');


  const fetchFoodDetails = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.edamam.com/api/food-database/v2/parser`,
        {
          params: {
            ingr: query,
            app_id: '05b58ecc',
            app_key: 'e595f6a6133c9320a4bfd4bdd32f35d2',
          },
        }
      );
      setFoodDetails(response.data.hints.map((hint) => hint.food));
    } catch (error) {
      console.error('Error fetching food details:', error);
    } finally {
      setLoading(false);
    }
  };

  
  const addToFoodLog = (item, servingSize) => {
    const newLog = [...foodLog, { ...item, servingSize }];
    setFoodLog(newLog);
    localStorage.setItem('foodLog', JSON.stringify(newLog));
    localStorage.setItem('foodLogTimestamp', new Date().getTime());
    
    alert('Item added to log!');
    setNotification('Item added to log!');
    setTimeout(() => setNotification(''), 3000);
  };

  const deleteFromFoodLog = (indexToDelete) => {
    const updatedLog = foodLog.filter((_, index) => index !== indexToDelete);
    setFoodLog(updatedLog);
    localStorage.setItem('foodLog', JSON.stringify(updatedLog));
  };

  const contextValue = {
    foodLog,
    foodDetails,
    setFoodDetails,
    setFoodLog,
    loading,
    notification,
    fetchFoodDetails,
    addToFoodLog,
    deleteFromFoodLog,
  };

  return (
    <FitContext.Provider value={contextValue}>
      {props.children}
    </FitContext.Provider>
  );
};


export default FitContextProvider;