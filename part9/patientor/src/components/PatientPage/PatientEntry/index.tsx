import { useEffect, useState } from "react";
import { Diagnosis, Entry } from "../../../types";
import diagnosisService from "../../../services/diagnoses";
import HealthCheck from "./HealthCheck";
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";

const PatientEntry = ({ entry }: { entry: Entry }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

  useEffect(() => {
    diagnosisService.getAll().then((diagnoses) => {
      setDiagnoses(diagnoses);
    });
  }, []);

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`,
    );
  };

  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheck entry={entry} diagnoses={diagnoses} />;
    case "Hospital":
      return <Hospital entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} diagnoses={diagnoses} />;
    default:
      assertNever(entry);
  }
};

export default PatientEntry;
