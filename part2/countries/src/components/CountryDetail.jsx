const CountryDetail = ({ selectedCountry }) => {
  return (
    <div>
      {selectedCountry &&
        <>
          <h1>{selectedCountry.name.common}</h1>
          {selectedCountry.capital.map(capitalCity => <div key={capitalCity}>Capital {capitalCity}</div>)}
          <div>Area {selectedCountry.area}</div>
          <h2>Languages</h2>
          <ul>
            {Object.values(selectedCountry.languages).map((language => <li key={language}>{language}</li>))}
          </ul>
          <img src={selectedCountry.flags.svg} alt={selectedCountry.flag} width={200} style={{ fontSize: 200 }} />
        </>
      }
    </div>
  )
}

export default CountryDetail
