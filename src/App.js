import './App.css';
import { useState,useEffect } from 'react';
import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './tailwind.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from './Components/Home/Home';
import Nutrients from './Components/Nutrients/Nutrients';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import DailyGoals from './Components/DailyGoals/DailyGoals';
import Preloader from "./Components/PreLoader/PreLoader";
import { Navigate } from 'react-router-dom';

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Preloader load={load} />
        <div className="App" id={load ? "no-scroll" : "scroll"}></div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/nutrients' element={<Nutrients/>}/>
          <Route path='/dailygoals' element={<DailyGoals/>}/>
          <Route path='*' element={<Navigate to='/home' />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
