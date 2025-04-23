import DisplayPerson from "./DisplayPerson"

const DisplayPersons = ({ persons, deleteNumber }) => {
  return (
    <div>
      <div>
        {persons.map((person) => <DisplayPerson key={person.id} person={person} deleteNumber={deleteNumber} />)}
      </div>
    </div>
  )
}

export default DisplayPersons
