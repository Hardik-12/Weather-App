/* eslint-disable no-unused-vars */
import React from "react";
import Weather from "./components/Weather";
import './App.css'




export default function App(){
  function getCurrentDay(){
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date();
    return daysOfWeek[currentDate.getDay()];
  }

  function getDate(){
    const currentDate = new Date();
  
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = currentDate.getDate().toString().padStart(2, '0');
    
    return `${day} / ${month} / ${year}`;
  }

  function getTime(){
    const currentDate = new Date();
  
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');
  
  return `${hours}:${minutes}:${seconds}`;
  }

  return (
    <div className="layout">
      <Weather 
        day={getCurrentDay}
        date={getDate}
        time={getTime}
      />
    </div>
  )
}