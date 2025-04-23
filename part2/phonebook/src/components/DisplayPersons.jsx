import DisplayPerson from "./DisplayPerson"

const DisplayPersons = ({ persons }) => {
    return (
        <div>
            <div>
                {persons.map((person) => <DisplayPerson key={person.id} person={person} />)}
            </div>
        </div>
    )
}

export default DisplayPersons
