import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { EntryFormValues, Patient } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import PatientEntry from "./PatientEntry";
import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import HealthCheckForm from "./PatientEntryForm/HealthCheckForm";
import HospitalForm from "./PatientEntryForm/HospitalForm";
import OccupationalHealthcareForm from "./PatientEntryForm/OccupationalHealthcareForm";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [entryForm, setEntryForm] = useState("");

  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    patientService.getById(id).then((patient) => {
      console.log(patient);
      setPatient(patient);
    });
  }, [id]);
  if (!id) return <div>No Patient found</div>;

  const addEntry = (newEntry: EntryFormValues) => {
    patientService
      .createEntry(id, newEntry)
      .then((entry) => {
        setPatient((prev) =>
          prev ? { ...prev, entries: [...prev.entries, entry] } : prev,
        );
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data[0].message);
        setTimeout(() => setErrorMessage(""), 3000);
      });
  };
  console.log(entryForm);
  return (
    <div>
      <h2>
        {patient?.name}{" "}
        {patient?.gender === "female" ? <FemaleIcon /> : <MaleIcon />}
      </h2>
      <div>ssn: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>
      {errorMessage && (
        <Alert severity="error" sx={{ marginY: 2 }}>
          {errorMessage}
        </Alert>
      )}
      {!showForm && (
        <Button
          type="button"
          onClick={() => setShowForm(true)}
          variant="contained"
          sx={{ marginY: 2 }}
        >
          Add New Entry
        </Button>
      )}
      {showForm && (
        <Paper elevation={3} sx={{ padding: 4, marginY: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="entry-type">Select Entry Type</InputLabel>
            <Select
              labelId="entry-type"
              value={entryForm}
              label="Select Entry Type"
              onChange={(e) => setEntryForm(e.target.value)}
            >
              <MenuItem value={"0"}>Add New HealthCheck Entry</MenuItem>
              <MenuItem value={"1"}>Add New Hospital Entry</MenuItem>
              <MenuItem value={"2"}>
                Add New OccupationalHealthcare Entry
              </MenuItem>
            </Select>
          </FormControl>
          {entryForm === "0" && (
            <HealthCheckForm setShowForm={setShowForm} addEntry={addEntry} />
          )}
          {entryForm === "1" && (
            <HospitalForm setShowForm={setShowForm} addEntry={addEntry} />
          )}
          {entryForm === "2" && (
            <OccupationalHealthcareForm
              setShowForm={setShowForm}
              addEntry={addEntry}
            />
          )}
        </Paper>
      )}
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
