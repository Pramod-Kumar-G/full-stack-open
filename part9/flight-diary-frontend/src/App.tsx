import { useEffect, useState } from "react";
import {
  type NonSensitiveDiaryEntry,
  type Visibility,
  type Weather,
} from "./types";
import { addDiary, getDiaries } from "./diaryService";
import axios from "axios";

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [visibility, setVisibility] = useState<Visibility>("" as Visibility);
  const [weather, setWeather] = useState<Weather>("" as Weather);
  const [comment, setComment] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    getDiaries().then((diaries) => setDiaries(diaries));
  }, []);

  const createDiaryEntry = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (visibility && weather) {
      addDiary({ date, visibility, weather, comment })
        .then((diary) => setDiaries(diaries.concat(diary)))
        .catch((error: unknown) => {
          if (axios.isAxiosError(error)) {
            console.log(error.response?.data);
            setErrorMessage(error.response?.data);
          } else {
            console.error(error);
          }
        });
    }
  };
  return (
    <div>
      <h3>Add new entry</h3>
      <p style={{ color: "red" }}>{errorMessage}</p>
      <form onSubmit={createDiaryEntry}>
        <div>
          Date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          Visibility
          <input
            type="text"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value as Visibility)}
          />
        </div>
        <div>
          Weather
          <input
            type="text"
            value={weather}
            onChange={(e) => setWeather(e.target.value as Weather)}
          />
        </div>
        <div>
          Comment
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
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
