import React, { useEffect, useState } from "react";
import { EntryFormValues } from "../../../types";
import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import diagnosisService from "../../../services/diagnoses";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);

  const [diagnosisCodes, setDiagnosisCodes] = React.useState<string[]>([]);
  const [codes, setCodes] = useState<string[]>([]);

  useEffect(() => {
    diagnosisService
      .getAll()
      .then((diagnoses) => setCodes(diagnoses.map((d) => d.code)));
  });

  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  const createEntry = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // const diagnosisCodeArray = diagnosisCodes.split(",");
    const newEntry: EntryFormValues = {
      date,
      type: "HealthCheck",
      specialist,
      description,
      diagnosisCodes,
      healthCheckRating,
    };
    addEntry(newEntry);
  };

  return (
    <form onSubmit={createEntry}>
      <h4>New HealthCheck Entry</h4>

      <TextField
        variant="standard"
        fullWidth
        type="date"
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
      <div>
        <FormControl fullWidth sx={{ marginY: 1 }}>
          <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
          <Select
            labelId="diagnosis-codes-label"
            id="demo-multiple-checkbox"
            multiple
            value={diagnosisCodes}
            onChange={handleChange}
            input={<OutlinedInput label="Diagnosis Codes" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {codes.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={diagnosisCodes.includes(name)} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <FormControl fullWidth>
        <InputLabel id="entry-type">Select Entry Type</InputLabel>
        <Select
          labelId="entry-type"
          value={healthCheckRating}
          label="Select Entry Type"
          onChange={(e) => setHealthCheckRating(Number(e.target.value))}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>
      </FormControl>
      {/* <TextField */}
      {/*   variant="standard" */}
      {/*   fullWidth */}
      {/*   label="HealthCheckRating" */}
      {/*   size="small" */}
      {/*   type="text" */}
      {/*   value={healthCheckRating} */}
      {/*   onChange={(e) => setHealthCheckRating(Number(e.target.value))} */}
      {/* /> */}
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
