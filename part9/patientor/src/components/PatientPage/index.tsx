import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { EntryFormValues, Patient } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import PatientEntry from "./PatientEntry";
import { Alert, Button, Paper, TextField } from "@mui/material";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    patientService.getById(id).then((patient) => {
      console.log(patient);
      setPatient(patient);
    });
  }, [id]);
  if (!id) return <div>No Patient found</div>;
  const addEntry = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const diagnosisCodeArray = diagnosisCodes.split(",");
    const newEntry: EntryFormValues = {
      date,
      type: "HealthCheck",
      specialist,
      description,
      healthCheckRating,
    };
    if (diagnosisCodeArray[0] !== "") {
      newEntry.diagnosisCodes = diagnosisCodeArray;
    }
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
        setTimeout(() => setErrorMessage(null), 3000);
      });
  };
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
          <h4>New HealthCheck Entry</h4>
          <form onSubmit={addEntry}>
            <TextField
              variant="standard"
              fullWidth
              label="Date"
              size="small"
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <TextField
              variant="standard"
              fullWidth
              label="Specialist"
              size="small"
              type="text"
              value={specialist}
              onChange={(e) => setSpecialist(e.target.value)}
            />
            <TextField
              variant="standard"
              fullWidth
              label="Description"
              size="small"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              variant="standard"
              fullWidth
              label="DiagnosisCodes"
              size="small"
              type="text"
              value={diagnosisCodes}
              onChange={(e) => setDiagnosisCodes(e.target.value)}
            />
            <TextField
              variant="standard"
              fullWidth
              label="HealthCheckRating"
              size="small"
              type="text"
              value={healthCheckRating}
              onChange={(e) => setHealthCheckRating(Number(e.target.value))}
            />
            <Button
              type="button"
              onClick={() => setShowForm(false)}
              variant="contained"
            >
              Cancel
            </Button>
            <Button type="submit" sx={{ margin: 2 }} variant="contained">
              Add Entry
            </Button>
          </form>
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
