import express, { NextFunction, Request, Response } from "express";
import patientService from "../services/patientService";
import { NewPatient, NonSensitivePatientData, Patient } from "../types";
import { NewPatientSchema } from "../utils";
import z from "zod";

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

router.get("/", (_req, res: Response<NonSensitivePatientData[]>) => {
  const patients = patientService.getNonSensitivePatientsData();
  res.send(patients);
});

router.get("/:id", (req, res: Response<Patient>) => {
  const { id } = req.params;
  const patient = patientService.getNonSensitivePatientData(id);
  if (patient) res.send(patient);
  else res.sendStatus(404);
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.send(addedPatient);
  },
);

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send(error.issues);
  } else {
    next(error);
  }
};

router.use(errorMiddleware);

export default router;
