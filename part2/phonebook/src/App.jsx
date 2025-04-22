import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        const isPresent = persons.find((person) => person.name == newName)
        if (isPresent) {
            alert(`${newName} is already added to phonebook`)
            return;
        }
        setPersons(persons.concat({ name: newName }))
        setNewName("")
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {persons.map((person) => <div key={person.name}>{person.name}</div>)}
            </div>
        </div>
    )
}

export default App
