import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import diagnosisService from "../services/diagnoses";
import { Diagnosis, Patient } from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const { id } = useParams();
  if (!id) {
    return <div>No Patient Found</div>;
  }
  useEffect(() => {
    patientService.getById(id).then((patient) => {
      console.log(patient);
      setPatient(patient);
    });
    diagnosisService.getAll().then((diagnoses) => {
      setDiagnoses(diagnoses);
    });
  }, []);
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
          <div key={entry.id}>
            {entry.date} {entry.description}
            <ul>
              {entry.diagnosisCodes?.map((code) => (
                <li key={code}>
                  {code} {diagnoses?.find((d) => d.code === code)?.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientPage;
