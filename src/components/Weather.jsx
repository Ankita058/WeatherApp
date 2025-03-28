import React, { useState } from 'react'
import cloud from '../Images/cloud.png'
import sunny from '../Images/sunny.png'
import clear from '../Images/clear.png'
import mist from '../Images/mist.png'
import rain from '../Images/rain.png'
import image from '../Images/image.png'


function Weather() {
  const APT_KEY='66cb6e9872e194c7b23611bcaf1a170c';
  const my_api='https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}';

  const[search,setSearch]=useState(""); // handling input value
  const[data,setData]=useState();

  const [error,setError]=useState();

  const handleinput = (event)=>{
     setSearch(event.target.value);
     console.log(event.target.value);

     
  }

  const getApi=async ()=>{ // fetching api from server
     const get = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${APT_KEY}&units=metric`);
     const api = await get.json();
     console.log(api);
     setData(api);

     
     if(search == "")
      {
       alert('Please put the city name');
      }
  }

    // Determine the correct weather image
    let weatherImage = null;
    if (data?.weather) {
      const weatherCondition = data.weather[0].main;
      switch (weatherCondition) {
        case "Clouds":
          weatherImage = cloud;
          break;
        case "Rain":
          weatherImage = rain;
          break;
        case "Mist":
          weatherImage = mist;
          break;
        case "Clear":
          weatherImage = clear;
          break;
        case "Haze":
          weatherImage = haze;
          break;
        default:
          weatherImage = sunny; // Default image
      }
    }
  // getApi();
  return (
    <>
    <div className='main-page'>
        <h2>Weather Report App</h2>
           <div className='weatherin'>
              <input type="text" placeholder='Enter the city name' onChange={handleinput}/>
              <button className='btn' onClick={getApi}>Click me</button> 
            </div>

            <div>
              { 
              data && data.weather  ? 
              <div>
                <h2>{data.name}</h2>
                <img src={weatherImage} alt="Weather icon"/>
            
                <h2>{Math.floor(data.main.temp)}°C</h2>
                <h3>{data.weather[0].description}</h3>
              </div> : ""
            
            }
            </div>
    </div>


   </>

  )
}

export default Weather