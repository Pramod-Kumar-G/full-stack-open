import express, { Response } from "express";
import patientService from "../services/patientService";
import { NewPatient, NonSensitivePatientData, Patient } from "../types";
import { toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientData[]>) => {
  const patients = patientService.getNonSensitivePatientData();
  res.send(patients);
});

router.post("/", (req, res: Response<Patient | string>) => {
  try {
    const newPatient: NewPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.send(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
