import React from 'react';
import "./styles.scss";
import Profile from './component/Profile'
import NavBar from './component/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import useDarkMode from './hooks/useDarkMode'
import Workers from './component/Workers';
import PoolStats from './component/PoolStats'
import DailyRewards from './component/DailyRewards'

require('dotenv').config()



function App() {
  const [darkMode, setDarkMode] = useDarkMode(false);

  return (
    <div className={darkMode ? "dark-mode App" : "App"}>
      <div className='nav-bar'>
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
      <div className='profile-div'>
        <Profile />
      </div>
      <div className='container'>
        <Workers />
      </div>
      <PoolStats />
      <DailyRewards />
    </div>
  );
}

export default App;
