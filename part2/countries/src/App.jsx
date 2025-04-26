import { useEffect, useState } from "react"
import CountryDetail from "./components/CountryDetail"
import CountryList from "./components/CountryList"
import CountryService from "./services/countries"

const App = () => {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [matchedCountries, setMatchedCountries] = useState([])
  const [message, setMessage] = useState("Please enter a country name")


  useEffect(() => {
    CountryService.getAll()
      .then(returnedCountries => setCountries(returnedCountries))
      .catch(error => { console.error("Error fetching countries: ", error) })
  }, [])

  const handleSearchInputChange = (event) => {
    const searchQuery = event.target.value.trim().toLowerCase()
    if (searchQuery.length < 1) {
      setMessage("Please enter a country name")
      return
    }
    const matches = countries.filter(country => country.name.common.toLowerCase().includes(searchQuery))

    if (matches.length > 10) {
      setMatchedCountries([])
      setMessage("Too many matches, specify another filter")
      setSelectedCountry(null)
    }
    else if (matches.length > 1) {
      setMatchedCountries(matches)
      setMessage("")
      setSelectedCountry(null)
    }
    else if (matches.length === 1) {
      setMatchedCountries([])
      setMessage("")
      setSelectedCountry(matches[0])
    }
    else {
      setMatchedCountries([])
      setMessage("No matches found")
      setSelectedCountry(null)
    }
  }
  if (countries === null) return null

  return (
    <div>
      <div>find countries <input onChange={handleSearchInputChange} /></div>
      <div>
        {message}
      </div>
      <CountryList matchedCountries={matchedCountries} setSelectedCountry={setSelectedCountry} />
      <CountryDetail selectedCountry={selectedCountry} />
    </div>
  )
}

export default App
