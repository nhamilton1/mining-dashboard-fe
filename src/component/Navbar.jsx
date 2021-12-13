import React, { useEffect, useState } from 'react';
import fetchDiffAdjust from '../services/fetchDiffAdjust';
import fetchPoolStats from '../services/fetchPoolStats';
import moment from 'moment';


const Navbar = (props) => {
  const [diff, setDiff] = useState([])
  const [pool, setPool] = useState([])

  const toggleMode = e => {
    e.preventDefault();
    props.setDarkMode(!props.darkMode);
  };

  useEffect(() => {
    fetchDiffAdjust()
      .then(res => {
        setDiff(res)
      })
  }, [])


  useEffect(() => {
    fetchPoolStats()
      .then(res => {
        setPool(res)
      })
  }, [])

  function findsBlocksMined(dateFound, sub) {
    sub = sub.toLowerCase()
    return dateFound.map(str => str
      .toLowerCase()
      .startsWith(sub.slice(0, Math.max(str.length - 1, 1)))
    );
  }

  const results = findsBlocksMined(Object.entries(pool).map(blocks => moment.unix(blocks[1].date_found).format('MMM Do , h:mm a')), moment().format('MMM Do'))
  let numOfTrue = results.filter(x => x === true).length


  return (
    <nav className="navbar">
      <h1>Miner Tracker</h1>
      {

        (diff.length < 1) ? <div className='loadingDiff'>Loading...</div> :
          <>
            <div>Blocks mined today: {numOfTrue}</div>
            <div className='timeframe-blocks-remaining'>
              <div className='blocks-remaining'>
                {diff.remainingBlocks} <span className='precentage'>blocks</span>
              </div>
              <span className='previousDiff'>~{(diff.remainingTime / 60000).toFixed(0)} days</span>
            </div>
            <div className='diff'>
              <div className='currentChange'>
                {(diff.difficultyChange).toFixed(2)}<span className='precentage'>%</span>
              </div>
              <span className='previousDiff'>Previous: {(diff.previousRetarget).toFixed(2)}%</span>
            </div>
          </>

      }
      <div className="dark-mode__toggle">
        <div
          onClick={toggleMode}
          className={props.darkMode ? 'toggle toggled' : 'toggle'}
        />
      </div>
    </nav>
  );
};

export default Navbar;
