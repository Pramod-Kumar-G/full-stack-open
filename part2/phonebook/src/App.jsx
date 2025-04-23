import { useState } from 'react'
import AddPerson from './components/AddPerson'
import Search from './components/Search'
import DisplayPersons from './components/DisplayPersons'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    ])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const handleSubmit = (event) => {
        event.preventDefault();
        const personExists = persons.find((person) => person.name.toLowerCase() == newName.toLowerCase())
        if (personExists) {
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

    return (
        <div>
            <h2>Phonebook</h2>
            <Search handleSearch={handleSearch} searchResults={searchResults} />
            <h2>Add a new</h2>
            <AddPerson handleSubmit={handleSubmit} newName={newName} newPhone={newPhone} setNewName={setNewName} setNewPhone={setNewPhone} />
            <h2>Numbers</h2>
            <DisplayPersons persons={persons} />
        </div>
    )
}

export default App
