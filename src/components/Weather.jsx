/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import IMAGES from "../assets/Images";


export default function Weather(props){
    const [weatherData, setWeatherData] = React.useState(null)
    const [formData, setFormData] = React.useState({
        search: ''
    })
    const [cityInfo, setCityInfo] = React.useState({
        name: '',
        weatherIcon: '',
        date: '',
        time: '',
        day: ''
    })
    
    React.useEffect(() => {
        async function getWeatherDetails(){
            var apiKey = 'a397fe9ce2762cce2b1b7a58324800c3'
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInfo.name}&appid=${apiKey}`)
            
            const data = await res.json()
            console.log("Data", data)
            if(res.ok){
                var iconurl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
                const adjustedDateObject = new Date((data.dt * 1000) + (data.timezone * 1000))
                const formattedTime = adjustedDateObject.toLocaleTimeString()

                // -----------------------------------
                const formattedDate = adjustedDateObject.toLocaleDateString()

                // -----------------------------------
                const dayOfWeek = adjustedDateObject.getDay()
                const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                const dayName = daysOfWeek[dayOfWeek];
                setWeatherData(data)
                
                setCityInfo(prevData => {
                    return {
                        ...prevData,
                        weatherIcon: iconurl,
                        time: formattedTime,
                        day: dayName,
                        date: formattedDate
                    }
                })
            } 
        }

        cityInfo.name && getWeatherDetails()

    }, [cityInfo.name])


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
        setCityInfo(prevData => {
            return {
                ...prevData,
                name: formData.search
            }
        })
    }

    return (
        <section className="weather">
            <div>
                <input type="text" className="search" name='search' placeholder="Enter City Name" value={formData.search} onChange={handleChange} />
                <button className="submit" onClick={handleClick}>
                    <img src={IMAGES.tick} alt="image not available" className="tick-img" />
                </button>
            </div>

            {
                weatherData && 
                <>
                    <div className="date-day utils">
                        <p className="day">{cityInfo.day}, &nbsp;</p>
                        <p className="date">{cityInfo.date}</p>
                    </div>
                    
    
                    <time className="time">{`${cityInfo.time}(GMT+-5:30)`}</time>
    
                    <p className="city utils">{cityInfo.name}</p>
                    <img src={cityInfo.weatherIcon} alt="Enter city" className="img-season" />
                    <p className="temperature utils">{Math.floor(weatherData.main.temp) - 273}°</p>

                </>
            }
        </section>
    )
}