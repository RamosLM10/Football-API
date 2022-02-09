import React, { useState } from 'react';
import '../App.css';
import Leagues from './Leagues';
import Standings from './Standings';

const Content = () => {
  const [active, setActive] = useState(true);

  return (
    <div className='content-container'>
      <div className='tabs'>
        <div className='tab-leagues' style={{ backgroundColor: active ? 'black' : null }} onClick={()=> setActive(true)}>
          <h2>Leagues</h2>
        </div>
        <div className='tab-standings' style={{ backgroundColor: ! active ? 'black' : null }} onClick={()=> setActive(false)}>
          <h2>Standings</h2>
        </div>
      </div>

      { active ? <Leagues /> : <Standings /> }
    </div>
  )
}

export default Content;
