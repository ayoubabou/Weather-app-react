import React,{useRef, useState, useEffect} from 'react'
import "./weatherApp.css";

import search_icon from "../Assets/search.png"
import clearWeather_icon from "../Assets/clear-weather.png"
import rainyWeather_icon from "../Assets/rain.png"
import cloudyWeather_icon from "../Assets/cloudy.png"
import wind_icon from "../Assets/wind.png"
import humidity_icon from "../Assets/humidity.jpeg"
import sun_icon from "../Assets/sun.jpeg"
import snowyWeather_icon from "../Assets/snow.png"
import mistyWeather_icon from "../Assets/mist.jpeg"
import hazeWeather_icon from "../Assets/haze.png"
import { countries } from '../../countries';

export const WeatherApp = () => {
  useEffect(()=>{
    let pressEnter = (e) => {
      if(e.key == "Enter"){
        searchWeather()
      }
    }
    document.addEventListener("keydown",pressEnter)
  },[])
  let inp = useRef()
  let [imgSrc,setImgSrc] = useState("")
  let [weatherStateStr,setWeatherStateStr] = useState("")
  async function searchWeather(){
    let locName = inp.current.value
    if (locName.replace(/ /g,"") != ""){
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${locName}&appid=402d991c82d1e7ce74eff6f576cfdafe`
      let response = await fetch(url)
      let data = await response.json()
      try {
        if(data.name !== undefined){
          document.getElementById("locName").innerHTML = `${data.name}, ${countries[data.sys.country]}`
        }
        if(data.weather[0].main == "Clouds"){
          setImgSrc(cloudyWeather_icon)
        }else if(data.weather[0].main == "Rain"){
          setImgSrc(rainyWeather_icon)
        }else if(data.weather[0].main == "Clear"){
          setImgSrc(clearWeather_icon)
        }else if(data.weather[0].main == "Snow"){
          setImgSrc(snowyWeather_icon)
        }else if(["Mist","Fog"].indexOf(data.weather[0].main)!=-1){
          setImgSrc(mistyWeather_icon)
        }else if(data.weather[0].main == "Haze"){
          setImgSrc(hazeWeather_icon)
        }
        setWeatherStateStr(data.weather[0].description)
        document.getElementById("temperature").innerHTML = Math.round(data.main.temp-273.15)+"°C"
        document.getElementById("tempMin").innerHTML = `Min<br/>${Math.round(data.main.temp_min-273.15)}°C`
        document.getElementById("tempMax").innerHTML = `Max<br/>${Math.round(data.main.temp_max-273.15)}°C`
        document.getElementById("windSpeed").innerHTML = data.wind.speed+" km/h"
        let x = document.createElement("img")
        x.src = wind_icon
        document.getElementById("windSpeed").appendChild(x)
        document.getElementById("humidity").innerHTML = data.main.humidity+"%"
        let y = document.createElement("img")
        y.src = humidity_icon
        document.getElementById("humidity").appendChild(y)
        x.className = y.className = "imgs2"
      } catch (error){
        return 
      }
    }
  }
  return (
    <div id="parentAppBox">
      <div id="appBox">
        <h1><img src={sun_icon} alt="" id="mainIcon"/> Weather App </h1>
        <input ref={inp} id="inp" placeholder="Enter a name of a location"/><button id="searchImgParent" onClick={()=>searchWeather()}><img alt="" id="searchImg" src={search_icon}/></button>
        <div id="weatherState"><img id="weatherImg" src={imgSrc} alt=""/></div><br/>
        <div className="weatherInfo" id='locName'></div>
        <div className='weatherInfo' id="weatherStateStr">{weatherStateStr}</div>
        <div className="weatherInfo" id='temperature'></div>
        <div className="weatherInfo2" id='tempMin'></div>
        <div className="weatherInfo2" id='tempMax'></div>
        <div className="weatherInfo2" id='windSpeed'></div>
        <div className="weatherInfo2" id='humidity'></div>
      </div>
    </div>
  )
}
