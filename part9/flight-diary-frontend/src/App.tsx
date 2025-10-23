import axios from "axios";
import { useEffect, useState } from "react";
import type { NonSensitiveDiaryEntry } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/diaries")
      .then((response) => setDiaries(response.data));
  }, []);
  return (
    <div>
      <h3>Diary Entries</h3>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h4>{diary.date}</h4>
          <div>Visibility: {diary.visibility}</div>
          <div>Weather: {diary.weather}</div>
        </div>
      ))}
    </div>
  );
};

export default App;
