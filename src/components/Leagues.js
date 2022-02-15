import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import  sites  from './Constants';

const Leagues = () => {
  const [data, setData] = useState([]);

  useEffect(()=> {
    axios('https://api-football-standings.azharimm.site/leagues')

    .then(res => {
      console.log(res.data.data);
      setData(res.data.data);
    })
  }, [])

  const findSource =(index) => {
    const site = sites.find((el) => el.id === index)
    return site.source;
  }

  return (
    <div className='leagues-container'>
    {data.map((data,index)=> (
          <div key={data.id}>
            <a href={findSource(index)} target='_blank' rel='noreferrer' className='leagues-div'>
              <img src={data.logos.light} alt={data.name} />
            </a>
            <h1 className='leagues-names'>{data.name}</h1>
          </div>
       ))}
    </div>
  );

  // return <div className='leagues-container'>
  //   {data.map((dataObj)=> (sites.filter(s => s.id === dataObj.id).map(({ source })=> ( (
  //         <div key={data.id}>
  //           <a href={source} target='_blank' rel='noreferrer' className='leagues-div'>
  //             <img src={data.logos.light} />
  //           </a>
  //           <h1>{data.name}</h1>
  //         </div>
  //       )))))}
  //   </div>;
};
  

export default Leagues;
