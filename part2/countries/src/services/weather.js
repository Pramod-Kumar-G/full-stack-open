import axios from "axios"

const API_KEY = import.meta.env.VITE_API_KEY
const baseUrl = "https://api.openweathermap.org/data/2.5/"

const getWeather = (capitalCity) => {
  return axios.get(`${baseUrl}weather?q=${capitalCity}&appid=${API_KEY}&units=metric`)
    .then(response => response.data)
}

export default {
  getWeather
}

