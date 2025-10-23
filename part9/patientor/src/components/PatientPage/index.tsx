import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Patient } from "../../types";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const { patientId } = useParams();
  if (!patientId) {
    return <div>No Patient Found</div>;
  }
  useEffect(() => {
    patientService.getById(patientId).then((patients) => {
      console.log(patients);
      const patient = patients.find((p) => p.id === patientId);
      setPatient(patient);
    });
  }, []);
  console.log(patient);
  return (
    <div>
      <h2>{patient?.name}</h2>
      <div>ssn: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>
    </div>
  );
};

export default PatientPage;
