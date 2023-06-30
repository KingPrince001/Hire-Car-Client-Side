import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Loading from '../Loading';
import '../../pages/home.css';
import { Grid } from '@mui/material';
import one from '../../assets/1.jpg';
import two from '../../assets/2.jpg';
import three from '../../assets/3.jpg';
import four from '../../assets/4.jpg';
import five from '../../assets/5.jpg';
import six from '../../assets/6.jpg';
import seven from '../../assets/7.jpg';
import eight from '../../assets/8.jpg';
import nine from '../../assets/9.jpg';
import ten from '../../assets/10.jpg';
import './fetchcar.css';
import {Link} from 'react-router-dom';


const CarList = () => {
  const [showTable, setShowTable] = useState({});
  const [hireRatesData, setHireRatesData] = useState([]);

  useEffect(() => {
    const fetchHireRates = async () => {
      try {
        const response = await fetch('https://carhireapi.azurewebsites.net/carsAndHireRates', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        setHireRatesData(data);
      } catch (error) {
        console.error('Error fetching hire rates data:', error);
      }
    };

    fetchHireRates();
  }, []);

  const carImageNames = [one, two, three, four, five, six, seven, eight, nine, ten];

  const mappedCarData = hireRatesData.map((car, index) => {
    const carImageName = carImageNames[index];
    const imageUrl = carImageName;
    return {
      ...car,
      imageUrl
    }
    
  });

  const handleSeeHireDetails = (carId) => {
    setShowTable((prevShowTable) => {
      const updatedShowTable = { ...prevShowTable };
  
      // Check if the table for the clicked carId is already open
      const isTableOpen = updatedShowTable[carId];
  
      // Close previously opened tables
      Object.keys(updatedShowTable).forEach((key) => {
        if (key !== carId && updatedShowTable[key]) {
          updatedShowTable[key] = false;
        }
      });
  
      // Toggle the state of the clicked table
      updatedShowTable[carId] = !isTableOpen;
  
      return updatedShowTable;
    });
  };
  
  const truncateText = (text, limit) => {
    const words = text.split('');
    if (words.length > limit) {
      return words.slice(0, limit).join('');
    }
    return text;
  }
  
  

  const exchangeRate = 110;

  return (
    <div className="home-data ">
      {mappedCarData.length === 0 ? (
        <Loading loadingItem="Off-Loading Car Listings ..." />
      ) : (
        <Grid container spacing={4} className="data-container ">
          {mappedCarData.map((car) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={car.car_id}>
              
                <div className="car-card">
                  <div className="image-slide">
                    <div className="car-img-container">
                      <img
                        className="car-image"
                        src={car.imageUrl}
                        alt={car.model}
                        style={{ height: '20vh', width: '18vw' }}
                      />
                    </div>
                    <div className="car-features-container">
                      <h2 className="features-title">Features</h2>
                      <hr style={{width:'80%', marginTop:'-20px'}}/>
                      <p className="features">{car.features}</p>
                    </div>
                  </div>
                  <h2 className="car-name">
                    {car.make} {truncateText(car.model,1)}
                  </h2>
                  <div className="car-properties-container">
                    <span className="car-properties">
                      <p className="car-size">Size: {car.size}</p>
                      <p className="car-fuel-type">Fuel Type: {car.fuel_type}</p>
                    </span>
                    <p className="car-transmission-type">Transmission Type: {car.transmission_type}</p>
                    <span className="car-available">
                      <p className="available">
                        Available: {car.available ? 'Yes' : 'No'}
                      </p>
                      <p className="car-year">Year: {car.year}</p>
                    </span>
                  </div>
                  {showTable[car.car_id] && car.hireRates && (
                    <div className="  overlay">
                      <table className="hire-rates-table ">
                        <thead className='table-header'>

                        <tr>
                            <th colSpan="4">
                              <div style={{ display: 'flex', justifyContent: 'space-between', margin:'0 30px', alignItems:'center' }}>
                                <span style={{display:'flex', alignItems:'center', gap:'20px'}}>
                                 <p>Car ID: {car.car_id}</p> 
                                  {car.make} {car.model}
                                </span>
                                <span className="reserve-hide-b">
                                <Button variant="contained" color="primary" component={Link} to="/reserve">
                                  Reserve
                                </Button>
                                <Button variant="contained" color="primary" style={{marginLeft:'20px'}} onClick={() => handleSeeHireDetails(car.car_id)}>
                                  Hide
                                </Button>
                                </span>
                               
                              </div>
                          
                            </th>
                          
                          </tr>

                          <tr>
                          <th>daily_rate (KSH)</th>
                        <th>weekly_rate (KSH)</th>
                        <th>monthly_rate (KSH)</th>
                            <th>Location</th>
                          </tr>
                        </thead>
                        <tbody>
                          {car.hireRates.map((hireRate) => (
                            <tr key={hireRate.hire_rates_id}>
                               <td>{(hireRate.daily_rate * exchangeRate).toFixed(2)}</td>
                        <td>{(hireRate.weekly_rate * exchangeRate).toFixed(2)}</td>
                        <td>{(hireRate.monthly_rate * exchangeRate).toFixed(2)}</td>
                              <td>{hireRate.location}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  <Button
                    className="see-hire-details-btn "
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{margin:'', width:''}}
                    onClick={() => handleSeeHireDetails(car.car_id)}
                  >
                    {showTable[car.car_id] ? 'Hide Table' : 'See Hire Details'}
                  </Button>
                </div>
              
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default CarList;
