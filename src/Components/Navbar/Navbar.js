import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Logo from '../Assets/logo.png';
import { GiStairsGoal } from "react-icons/gi";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center">
        
      
        <div className="flex items-center space-x-2">
          <Link to='/'>
            <img src={Logo} alt="Fit Play Logo" className="w-10" />
          </Link>
          <Link to="/"><span className="text-2xl font-bold" style={{ fontFamily: 'monospace' }}>Fit Play</span></Link>
        </div>

        <div className="flex space-x-4 mt-3 md:mt-0">
        <Link to="/" 
            className="flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition duration-300 ease-in-out"
          >
            Home
          </Link>

        <Link to="/dailygoals" 
            className="flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition duration-300 ease-in-out"
          >
            <GiStairsGoal />&nbsp;
            Daily Goals
          </Link>
          
          <Link to="/nutrients" 
            className="flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition duration-300 ease-in-out"
          >
            <FontAwesomeIcon icon={faChartPie} className="mr-2" />

            Nutrients
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
