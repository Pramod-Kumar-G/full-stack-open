const CountryList = ({ matchedCountries, setSelectedCountry }) => {
  return (
    <div>
      {matchedCountries.map(country => <div key={country.name.common}>{country.name.common} <button onClick={() => setSelectedCountry(country)}>show</button></div>)}
    </div>
  )
}

export default CountryList
