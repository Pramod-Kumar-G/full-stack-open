import { useEffect, useState } from 'react'
import AddPerson from './components/AddPerson'
import Search from './components/Search'
import DisplayPersons from './components/DisplayPersons'
import personService from "./services/persons"
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])


  const updatePerson = (personExists) => {
    const updatedPerson = { ...personExists, number: newNumber }
    personService.update(updatedPerson.id, updatedPerson).then(returnedPerson => {
      setMessage({ content: `Updated ${returnedPerson.name}'s number to ${returnedPerson.number}`, success: true })
      setTimeout(() => { setMessage(null) }, 5000)
      setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
    }).catch(error => {
      setMessage({ content: `Information of ${newName} has already been removed from server`, success: false })
      setTimeout(() => { setMessage(null) }, 5000)
      setPersons(persons.filter(person => person.name !== newName))
    })
    setNewName("")
    setNewNumber("")
  }
  const createPerson = () => {
    const personObject = { name: newName, number: newNumber }
    personService.create(personObject).then(returnedPerson => {
      setMessage({ content: `Added ${returnedPerson.name}`, success: true })
      setTimeout(() => { setMessage(null) }, 5000)
      setPersons(persons.concat(returnedPerson))
      setNewName("")
      setNewNumber("")
    })
      .catch(error => {
        setMessage({ content: error.response.data.error })
        setTimeout(() => { setMessage(null) }, 5000)
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newName.length === 0 || newNumber.length === 0) {
      alert("Empty name or number provided. Please fill all the details.")
      return;
    }
    const personExists = persons.find((person) => person.name.toLowerCase() == newName.toLowerCase())
    if (personExists) {
      if (!confirm(`${personExists.name} is already added to phonebook, replace the old number with a new one?`)) {
        setNewName("")
        setNewNumber("")
        return;
      }
      updatePerson(personExists)
      return;
    }
    createPerson()
  }

  const handleSearch = (event) => {
    const searchQuery = event.target.value;
    const filteredPersonsArray = persons.filter((person) => person.name.toLowerCase().includes(searchQuery.toLowerCase()))
    setSearchResults(filteredPersonsArray)
  }

  const deleteNumber = (id) => {
    const deletePerson = persons.find(person => person.id === id)
    if (confirm(`Delete ${deletePerson.name} ?`)) {

      personService.remove(id).then(returnedPerson => {
        setPersons(persons.filter(person => person.id !== id))
        setSearchResults(searchResults.filter(person => person.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Search handleSearch={handleSearch} searchResults={searchResults} deleteNumber={deleteNumber} />
      <h2>Add a new</h2>
      <AddPerson handleSubmit={handleSubmit} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <DisplayPersons persons={persons} deleteNumber={deleteNumber} />
    </div>
  )
}

export default App
