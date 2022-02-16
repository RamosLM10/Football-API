import react, { useEffect, useState } from "react"; 
import sites from "./Constants";
import axios from "axios";
import { MutatingDots } from "react-loader-spinner";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as React from 'react';


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
        <Paper className="paper-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell numeric>Team</TableCell>
            <TableCell></TableCell>
            <TableCell>Points</TableCell>
            <TableCell>Games Played</TableCell>
            <TableCell>Wins</TableCell>
            <TableCell>Draws</TableCell>
            <TableCell>Losses</TableCell>
            <TableCell>Goals For</TableCell>
            <TableCell>Goals Against</TableCell>
            <TableCell>Goal Difference</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data, index) => (
             <TableRow div key={data.team.id}>
              <TableCell component="th" scope="row">
                {`${index + 1}.`}
              </TableCell>
              <TableCell>{data.team.displayName}</TableCell>
              <TableCell><img style={{ width: '50px' }} src={data.team.logos[0].href} alt='#'/></TableCell>
              <TableCell style={{fontWeight: 'bolder'}}>{data.stats[6].value}</TableCell>
              <TableCell>{data.stats[3].value}</TableCell>
              <TableCell align="left">{data.stats[0].value}</TableCell>
              <TableCell>{data.stats[2].value}</TableCell>
              <TableCell>{data.stats[1].value}</TableCell>
              <TableCell>{data.stats[4].value}</TableCell>
              <TableCell>{data.stats[5].value}</TableCell>
              <TableCell>{data.stats[9].value}</TableCell>
             </TableRow> 
        ))}
        </TableBody>
      </Table>
    </Paper>
      </div>  
      }
    </div>
  </div>);
};

export default Standings;


 
// for <Table sx={{ overFlowX:'auto', display:'block', minWidth: '150px'}} size="small" aria-label="a dense table">