import { useState } from "react";
import { EntryFormValues } from "../../../types";
import { Button, TextField } from "@mui/material";

const OccupationalHealthcareForm = ({
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
  const [employerName, setEmployerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const createEntry = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const diagnosisCodeArray = diagnosisCodes.split(",");
    const newEntry: EntryFormValues = {
      date,
      type: "OccupationalHealthcare",
      specialist,
      description,
      employerName,
      sickLeave: {
        startDate,
        endDate,
      },
    };
    if (diagnosisCodeArray[0] !== "") {
      newEntry.diagnosisCodes = diagnosisCodeArray;
    }
    addEntry(newEntry);
  };

  return (
    <form onSubmit={createEntry}>
      <h4>New OccupationalHealthcare Entry</h4>
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
        label="Employer Name"
        size="small"
        type="text"
        value={employerName}
        onChange={(e) => setEmployerName(e.target.value)}
      />
      <TextField
        variant="standard"
        fullWidth
        label="Sick Leave Start Date"
        size="small"
        type="text"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <TextField
        variant="standard"
        fullWidth
        label="Sick Leave End Date"
        size="small"
        type="text"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
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

export default OccupationalHealthcareForm;
