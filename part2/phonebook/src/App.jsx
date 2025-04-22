import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    ])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const handleSubmit = (event) => {
        event.preventDefault();
        const isPresent = persons.find((person) => person.name.toLowerCase() == newName.toLowerCase())
        if (isPresent) {
            alert(`${newName} is already added to phonebook`)
            return;
        }
        if (newName.length === 0 || newPhone.length === 0) {
            alert("Empty name or phone provided. Please fill all the details.")
            return;
        }
        setPersons(persons.concat({ name: newName, phone: newPhone, id: persons.length + 1 }))
        setNewName("")
        setNewPhone("")
    }

    const handleSearch = (event) => {
        const searchQuery = event.target.value;
        const filteredPersonsArray = persons.filter((person) => person.name.toLowerCase().includes(searchQuery.toLowerCase()))
        setSearchResults(filteredPersonsArray)
    }
    console.log(persons)

    return (
        <div>
            <h2>Phonebook</h2>
            <div>Filter shown with <input onChange={handleSearch} /></div>
            <div>{searchResults.map(person => <div key={person.id}>{person.name} {person.phone}</div>)}</div>

            <h2>Add a new</h2>
            <form onSubmit={handleSubmit}>
                <div>name: <input value={newName} onChange={(event) => setNewName(event.target.value)} /></div>
                <div>number: <input value={newPhone} onChange={(event) => setNewPhone(event.target.value)} /></div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {persons.map((person) => <div key={person.id}>{person.name} {person.phone}</div>)}
            </div>
        </div>
    )
}

export default App
