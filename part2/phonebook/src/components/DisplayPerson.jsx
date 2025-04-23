const DisplayPerson = ({ person, deleteNumber }) => {
  return (
    <div>{person.name} {person.number} <button onClick={() => deleteNumber(person.id)}>delete</button></div>
  )
}

export default DisplayPerson
