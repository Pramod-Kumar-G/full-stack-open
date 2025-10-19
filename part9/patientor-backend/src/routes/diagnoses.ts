import diagnosisService from "../services/diagnosisService";
import express, { Response } from "express";
import { Diagnosis } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
  const diagnoses = diagnosisService.getDiagnoses();
  res.send(diagnoses);
});

export default router;
