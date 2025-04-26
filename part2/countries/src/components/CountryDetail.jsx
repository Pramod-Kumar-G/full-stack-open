import { useEffect, useState } from "react"
import weatherService from "../services/weather"

const CountryDetail = ({ selectedCountry }) => {
  const [weather, setWeather] = useState(null)
  const [iconUrl, setIconUrl] = useState(null)
  useEffect(() => {
    if (selectedCountry !== null) {
      weatherService.getWeather(selectedCountry.capital[0])
        .then(weatherData => {
          setWeather(weatherData)
          console.log(weatherData)
          console.log(weatherData.weather)
          console.log(weatherData.weather[0].icon)
          setIconUrl(`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`)
        })
    }
  }, [selectedCountry])
  return (
    <div>
      {selectedCountry &&
        <>
          <h1>{selectedCountry.name.common}</h1>
          Capital {selectedCountry.capital[0]}
          <div>Area {selectedCountry.area}</div>
          <h2>Languages</h2>
          <ul>
            {Object.values(selectedCountry.languages).map((language => <li key={language}>{language}</li>))}
          </ul>
          <img src={selectedCountry.flags.svg} alt={selectedCountry.flag} width={200} style={{ fontSize: 200 }} />
          <div>
            <h2>Weather in {selectedCountry.capital[0]}</h2>
            <div>
              Temperature {weather && weather.main.temp} Celsius
            </div>
            {weather && <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />}
            <div>
              Wind {weather && weather.wind.speed} m/s
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default CountryDetail
