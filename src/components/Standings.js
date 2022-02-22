import react, { useEffect, useState } from "react"; 
import sites from "./Constants";
import axios from "axios";
import { MutatingDots } from "react-loader-spinner";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';



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
      : 
        <div className='standings-info'>
          <Table>
            <Thead>
              <Tr>
                <Th>Rank</Th>
                <Th>Team</Th>
                <Th></Th>
                <Th>Points</Th>
                <Th>Games Played</Th>
                <Th>Wins</Th>
                <Th>Draws</Th>
                <Th>Losses</Th>
                <Th>Goals For</Th>
                <Th>Goals Against</Th>
                <Th>Goal Difference</Th>
              </Tr>
            </Thead>
              <Tbody>
                {data.map((data, index) => (
                  <Tr key={data.team.id}>
                    <Td>{`${index + 1}`}</Td>
                    <Td>{data.team.displayName}</Td>
                    <Td><img style={{ width: '50px' }} src={data.team.logos[0].href} alt='#'/></Td>
                    <Td style={{fontWeight: 'bolder'}}>{data.stats[6].value}</Td>
                    <Td>{data.stats[3].value}</Td>
                    <Td>{data.stats[0].value}</Td>
                    <Td>{data.stats[2].value}</Td>
                    <Td>{data.stats[1].value}</Td>
                    <Td>{data.stats[4].value}</Td>
                    <Td>{data.stats[5].value}</Td>
                    <Td>{data.stats[9].value}</Td>
                   </Tr> 
                ))}
              </Tbody>
            </Table>
      </div>  
      }
    </div>
  </div>);
};

export default Standings;


 
