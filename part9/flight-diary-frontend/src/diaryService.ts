import axios from "axios";
import type { NewDiaryEntry, NonSensitiveDiaryEntry } from "./types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getDiaries = async () => {
  const response = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
  return response.data;
};

export const addDiary = async (diary: NewDiaryEntry) => {
  const response = await axios.post<NonSensitiveDiaryEntry>(baseUrl, diary);
  return response.data;
};
