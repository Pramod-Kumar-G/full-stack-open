import DisplayPerson from "./DisplayPerson"

const Search = ({ searchResults, handleSearch }) => {
    return (
        <div>
            <div>Filter shown with <input onChange={handleSearch} /></div>
            <div>{searchResults.map(person => <DisplayPerson key={person.id} person={person} />)}</div>
        </div>
    )
}

export default Search
