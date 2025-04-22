import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', phone: '83666-64641' }
    ])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        const isPresent = persons.find((person) => person.name == newName)
        if (isPresent) {
            alert(`${newName} is already added to phonebook`)
            return;
        }
        if (newName.length === 0 || newPhone.length === 0) {
            alert("Empty name or phone provided. Please fill all the details.")
            return;
        }
        setPersons(persons.concat({ name: newName, phone: newPhone }))
        setNewName("")
        setNewPhone("")
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleSubmit}>
                <div>name: <input value={newName} onChange={(event) => setNewName(event.target.value)} /></div>
                <div>number: <input value={newPhone} onChange={(event) => setNewPhone(event.target.value)} /></div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {persons.map((person) => <div key={person.name}>{person.name} {person.phone}</div>)}
            </div>
        </div>
    )
}

export default App
