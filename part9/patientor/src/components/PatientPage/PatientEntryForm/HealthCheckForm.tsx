import { useState } from "react";
import { EntryFormValues } from "../../../types";
import { Button, TextField } from "@mui/material";

const HealthCheckForm = ({
  setShowForm,
  addEntry,
}: {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  addEntry: (newEntry: EntryFormValues) => void;
}) => {
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);

  const createEntry = (e: React.SyntheticEvent) => {
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
    addEntry(newEntry);
  };

  return (
    <form onSubmit={createEntry}>
      <h4>New HealthCheck Entry</h4>
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
  );
};

export default HealthCheckForm;
