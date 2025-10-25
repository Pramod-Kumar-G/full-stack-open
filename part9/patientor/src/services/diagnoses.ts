import axios from "axios";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const response = await axios.get(`${apiBaseUrl}/diagnoses`);
  return response.data;
};

export default {
  getAll,
};
