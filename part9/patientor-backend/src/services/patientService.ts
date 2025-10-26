import { v1 as uuid } from "uuid";
import patients from "../../data/patients";
import { Entry, NewEntry, NonSensitivePatientData, Patient } from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientData = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const getNonSensitivePatientsData = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Omit<Patient, "id">): Patient => {
  const newPatient = {
    id: uuid(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    entries: [],
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: NewEntry): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  const patientIndex = patients.findIndex((p) => p.id === id);
  patients[patientIndex].entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatientsData,
  getPatientData,
  addPatient,
  addEntry,
};
