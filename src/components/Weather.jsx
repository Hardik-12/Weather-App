/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import IMAGES from "../assets/Images";


export default function Weather(props){
    const [weatherData, setWeatherData] = React.useState(null)
    const [formData, setFormData] = React.useState({
        search: ''
    })
    const [city, setCity] = React.useState('')
    const [weatherIcon, setWeatherIcon] = React.useState(null)



    React.useEffect(() => {
        async function getWeatherDetails(){
            var apiKey = 'a397fe9ce2762cce2b1b7a58324800c3'
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            
            const data = await res.json()
            console.log("Data", data)
            if(res.ok){
                setWeatherData(data)
                var iconurl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
                setWeatherIcon(iconurl)
            } 
        }

        city && getWeatherDetails()

    }, [city])


    function handleChange(event){
        const {name, value} = event.target
        setFormData(() => {
            return {
                ...formData,
                [name]: value
            }
        })
    }


    function handleClick(){
        setCity(formData.search)
        
    }

    return (
        <section className="weather">
            <div>
                <input type="text" className="search" name='search' placeholder="Enter City Name" value={formData.search} onChange={handleChange} />
                <button className="submit" onClick={handleClick}>
                    <img src={IMAGES.tick} alt="image not available" className="tick-img" />
                </button>
            </div>

            <div className="date-day utils">
                <p className="day">{props.day()}, &nbsp;</p>
                <p className="date">{props.date()}</p>
            </div>

            <time className="time">{props.time()}</time>

            <p className="city utils">{city}</p>
            <img src={weatherIcon} alt="" className="img-season" />
            <p className="temperature utils">{weatherData && Math.floor(weatherData.main.temp) - 273}°</p>
        </section>
    )
}