const CountryList = ({ matchedCountries }) => {
  return (
    <div>
      {matchedCountries.map(country => <div key={country.name.common}>{country.name.common}</div>)}
    </div>
  )
}

export default CountryList
