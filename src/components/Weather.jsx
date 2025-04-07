import React, { useState } from 'react'
import cloud from '../Images/cloud.png'
import error from '../Images/error.png'
import clear from '../Images/clear.png'
import mist from '../Images/mist.png'
import rain from '../Images/rain.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





function Weather() {
  const APT_KEY='66cb6e9872e194c7b23611bcaf1a170c';
  const my_api='https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}';
  console.log(my_api);

  const[search,setSearch]=useState(""); // taking city name from userinput
  const[data,setData]=useState(); // taking api data

  const [error,setError]=useState(); // handling

  const handleinput = (event)=>{
     setSearch(event.target.value);
     console.log(event.target.value);

     
  }

  const getApi=async ()=>{ // fetching api from server
     const get = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${APT_KEY}&units=metric`);
     const api = await get.json();
     console.log(api);
     setData(api);

      
     if (!search.trim()) {
      toast.warning("Please select a city", { position: "top-center" });
      return;
    }
      if (api.cod !== 200) {
        toast.error("Invalid city name", { position: "top-center" });
        return;
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
          weatherImage = error; // Default image
      }
    }
  // getApi();
  return (
    <>
    <div className='main-page'>
        <h3>Weather Report App</h3>
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
    <ToastContainer/>
    </>
  )
}

      
       
export default Weather