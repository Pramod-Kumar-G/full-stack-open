import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Patient } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import PatientEntry from "./PatientEntry";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    patientService.getById(id).then((patient) => {
      console.log(patient);
      setPatient(patient);
    });
  }, [id]);
  return (
    <div>
      <h2>
        {patient?.name}{" "}
        {patient?.gender === "female" ? <FemaleIcon /> : <MaleIcon />}
      </h2>
      <div>ssn: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>
      <p style={{ fontWeight: "bold" }}>entries</p>
      <div>
        {patient?.entries.map((entry) => (
          <div
            key={entry.id}
            style={{
              border: "2px solid black",
              borderRadius: "0.3em",
              marginBottom: "0.5em",
              padding: "0.2em",
            }}
          >
            <PatientEntry entry={entry} />
            <div>diagnose by {entry.specialist}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientPage;
