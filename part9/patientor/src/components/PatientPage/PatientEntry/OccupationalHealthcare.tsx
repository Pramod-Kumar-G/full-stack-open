import WorkIcon from "@mui/icons-material/Work";
import { Diagnosis, OccupationalHealthcareEntry } from "../../../types";

const OccupationalHealthcare = ({
  entry,
  diagnoses,
}: {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[] | undefined;
}) => {
  return (
    <>
      <div>
        {entry.date} <WorkIcon fontSize="small" /> {entry.employerName}
      </div>
      <i>{entry.description}</i>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((code) => (
            <li key={code}>
              {code} {diagnoses?.find((d) => d.code === code)?.name}
            </li>
          ))}
        </ul>
      )}
      {entry.sickLeave && (
        <div>
          sick leave from {entry.sickLeave.startDate} to{" "}
          {entry.sickLeave.endDate}
        </div>
      )}
    </>
  );
};

export default OccupationalHealthcare;
