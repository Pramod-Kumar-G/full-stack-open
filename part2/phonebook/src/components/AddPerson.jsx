const AddPerson = ({ newName, newNumber, setNewName, setNewNumber, handleSubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>name: <input value={newName} onChange={(event) => setNewName(event.target.value)} /></div>
        <div>number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default AddPerson
