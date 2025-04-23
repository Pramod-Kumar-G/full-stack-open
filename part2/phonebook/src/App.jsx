import { useEffect, useState } from 'react'
import AddPerson from './components/AddPerson'
import Search from './components/Search'
import DisplayPersons from './components/DisplayPersons'
import axios from 'axios'
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const personExists = persons.find((person) => person.name.toLowerCase() == newName.toLowerCase())
    if (personExists) {
      alert(`${newName} is already added to phonebook`)
      return;
    }
    if (newName.length === 0 || newNumber.length === 0) {
      alert("Empty name or number provided. Please fill all the details.")
      return;
    }
    const personObject = { name: newName, number: newNumber }
    personService.create(personObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName("")
      setNewNumber("")
    })
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
      <AddPerson handleSubmit={handleSubmit} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <DisplayPersons persons={persons} />
    </div>
  )
}

export default App
