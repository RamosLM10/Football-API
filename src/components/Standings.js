import react, { useEffect, useState } from "react"; 
import sites from "./Constants";
import axios from "axios";
import { MutatingDots } from "react-loader-spinner";

const Standings = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState('eng.1');
  const [selectedYear, setSelectedYear] = useState('2021')

  useEffect(()=> {
    setLoading(true);
    axios(`https://api-football-standings.azharimm.site/leagues/${selectedLeague}/standings?season=${selectedYear}`
    ).then (res => {
      console.log(res.data.data.standings);
      setData(res.data.data.standings);
    }).catch (err=> 
      console.log(err)
      ).finally (()=> setLoading(false))
      
    
  }, [selectedLeague, selectedYear])
 

  return (
  <div className='standings-container'>
    
    <div className="select-container">
        <select
          name= "select-league"
          id= "select-league"
          defaultValue= {selectedLeague}
          onChange={(e)=> setSelectedLeague(e.target.value)}
        >
          {sites.map(({value,title}) => (
          <option value={value}>{title}</option> 
          ))}
        </select>
        <select
          name= "select-year"
          id= "select-year"
          defaultValue= {selectedYear}
          onChange={(e)=> setSelectedYear(e.target.value)}
        >
          <option value='2011'>2011</option>
          <option value='2012'>2012</option>
          <option value='2013'>2013</option>
          <option value='2014'>2014</option>
          <option value='2015'>2015</option>
          <option value='2016'>2016</option>
          <option value='2017'>2017</option>
          <option value='2018'>2018</option>
          <option value='2019'>2019</option>
          <option value='2020'>2020</option>
          <option value='2021'>2021</option>
        </select>
    </div>
   
    <div className="standings-results">
      {loading ? ( 
      <MutatingDots color="black" secondaryColor="black" height={80} width={80} /> ) 
      : (
      data.map((data, index) => (
        <div key={data.team.id} > 
          <h1>
            <span>{`${index + 1}.`} 
              <img className='standings-info' src={data.team.logos[0].href} alt='#'/>
            </span>
            {data.team.displayName}
          </h1>
          {/* <h1>{data.stats[6].value}</h1> */}
        </div>
      ))
    )}
    </div>
  </div>);
};

export default Standings;


