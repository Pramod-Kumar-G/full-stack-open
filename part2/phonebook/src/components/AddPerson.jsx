const AddPerson = ({ newName, newPhone, setNewName, setNewPhone, handleSubmit }) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>name: <input value={newName} onChange={(event) => setNewName(event.target.value)} /></div>
                <div>number: <input value={newPhone} onChange={(event) => setNewPhone(event.target.value)} /></div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default AddPerson
