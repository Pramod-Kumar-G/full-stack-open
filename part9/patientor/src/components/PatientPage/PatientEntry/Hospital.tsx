import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Diagnosis, HospitalEntry } from "../../../types";

const Hospital = ({
  entry,
  diagnoses,
}: {
  entry: HospitalEntry;
  diagnoses: Diagnosis[] | undefined;
}) => {
  return (
    <>
      <div>
        {entry.date} <LocalHospitalIcon fontSize="small" />
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
      discharge on {entry.discharge.date} if {entry.discharge.criteria}
    </>
  );
};

export default Hospital;
