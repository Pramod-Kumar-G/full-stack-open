import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Diagnosis, HealthCheckEntry } from "../../../types";

const HealthCheck = ({
  entry,
  diagnoses,
}: {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[] | undefined;
}) => {
  return (
    <>
      <div>
        {entry.date} <AssignmentTurnedInIcon fontSize="small" />
      </div>
      <i>{entry.description}</i>

      <div>
        <FavoriteIcon
          fontSize="small"
          style={{
            color:
              entry.healthCheckRating === 0
                ? "green"
                : entry.healthCheckRating === 1
                  ? "yellow"
                  : entry.healthCheckRating === 2
                    ? "orange"
                    : "red",
          }}
        />
      </div>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((code) => (
            <li key={code}>
              {code} {diagnoses?.find((d) => d.code === code)?.name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default HealthCheck;
