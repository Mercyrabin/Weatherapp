import React, {  useState } from 'react'
import icon from '../Assets/icon.svg'
import gitlab from '../Assets/gitlab.svg'
import axios from 'axios'

export default function Weather() {
    const[cityText,setCityText]=useState('');
    const[weatherData,setWeatherData]=useState({
        data:{},
        error:false
    }
    );
    console.log(cityText);
    console.log("Hello");
    const search=async(e)=>{
        if(e.key==='Enter'){
            e.preventDefault();
            // https://api.openweathermap.org/data/2.5/weather?q=Chennai&appid=762e8280d34e8257760ed79dfe0085e1&units=Metric
            const url="https://api.openweathermap.org/data/2.5/weather";
            const apiKey="762e8280d34e8257760ed79dfe0085e1";
            await axios.get(url,{
                params:{
                    q:cityText,
                    appid:apiKey,
                    units:'metric'
                }
            }).then((response)=>{
                console.log(response);
                setWeatherData({data:response.data,error:false});
            }).catch((error)=>{
                console.log(error);
                setWeatherData({...weatherData,data:{},error:true});
                setCityText("")
            })
        }
    }
    
  return (
    
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-400 to-blue-900'>
        <div className="container w-full mx-4 md:w-6/12 lg:w-4/12 border border-gray-300  my-20 shadow-xl rounded-lg ">
            <h1 className='text-3xl font-bold text-gray-700 text-center my-4'>Weather Forecast</h1>
            <div className="flex items-center focus-outline-gray-500 rounded bg-transparent w-full   relative">
            
            <input type="text" placeholder='Enter City'value={cityText} onChange={(e)=>{setCityText(e.target.value)}} onKeyDown={search} className=' px-10 m-5 rounded-3xl py-5 text-xl font-medium w-full'></input>
            <img src={icon} onClick={()=>search()} className='h-5 outline-none cursor-pointer rounded absolute top-11 left-7 opacity-3 'alt="search Icon"/>
            </div>
        
        <div className='px-4'>
            {weatherData.error&&(<p className='p-3 m-3 font-medium text-xl text-red-600'>City name not found</p>)}
            {weatherData && weatherData.data && weatherData.data.main && (<><img src={`https://openweathermap.org/img/wn/${weatherData.data.weather[0].icon}.png`} alt={weatherData.data.weather[0].description} className='w-40 h-40 mx-auto'/>
            
            <p className='text-center text-5xl'>{Math.round(weatherData.data.main.temp)}°C</p>
            <h5 className='text-center text-xl'>{weatherData.data.sys.country},{weatherData.data.name}</h5>
        
        <div className='flex items-center justify-evenly my-5'>
            <div className='flex flex-col items-center'>
                <img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/humidity-2-162742.png?f=webp&w=256" className='h-10 w-10'/>
                <div className='mx-3'>Humidity:{weatherData.data.main.humidity}%</div>
            </div>
            <div className='flex flex-col items-center'>
                <img src="https://static.thenounproject.com/png/927231-200.png " className='h-10 w-10'/>
                <div className='mx-3'>Wind Speed:{weatherData.data.wind.speed}km/h</div>
            </div>
        </div></>)}
           
        </div>
        <p className='text-center text-2xl mb-3 *:text-gray-900'>Designed by: 
        <span>
            <a href="https://gitlab.com/orab11/weather_forcast" className='text-white italic'>Mercy Robin 
            </a>
        </span></p>                 
    </div>
    </div>
  )
}
