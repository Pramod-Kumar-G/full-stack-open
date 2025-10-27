import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import HealthCheckForm from "../PatientEntryForm/HealthCheckForm";
import HospitalForm from "../PatientEntryForm/HospitalForm";
import OccupationalHealthcareForm from "../PatientEntryForm/OccupationalHealthcareForm";
import { useState } from "react";
import { EntryFormValues } from "../../../types";

const PatientEntryForm = ({
  addEntry,
  setShowForm,
}: {
  addEntry: (newEntry: EntryFormValues) => void;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [entryForm, setEntryForm] = useState("");
  return (
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
          <MenuItem value={"2"}>Add New OccupationalHealthcare Entry</MenuItem>
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
  );
};

export default PatientEntryForm;
