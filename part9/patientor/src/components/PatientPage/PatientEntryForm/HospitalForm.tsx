import { useState } from "react";
import { EntryFormValues } from "../../../types";
import { Button, TextField } from "@mui/material";

const HospitalForm = ({
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
  const [dischargeDate, setDischargeDate] = useState("");
  const [criteria, setCriteria] = useState("");

  const createEntry = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const diagnosisCodeArray = diagnosisCodes.split(",");
    const newEntry: EntryFormValues = {
      date,
      type: "Hospital",
      specialist,
      description,
      discharge: {
        criteria,
        date: dischargeDate,
      },
    };
    if (diagnosisCodeArray[0] !== "") {
      newEntry.diagnosisCodes = diagnosisCodeArray;
    }
    addEntry(newEntry);
  };

  return (
    <form onSubmit={createEntry}>
      <h4>New Hospital Entry</h4>
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
        label="Discharge Date"
        size="small"
        type="text"
        value={dischargeDate}
        onChange={(e) => setDischargeDate(e.target.value)}
      />
      <TextField
        variant="standard"
        fullWidth
        label="Criteria"
        size="small"
        type="text"
        value={criteria}
        onChange={(e) => setCriteria(e.target.value)}
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

export default HospitalForm;
