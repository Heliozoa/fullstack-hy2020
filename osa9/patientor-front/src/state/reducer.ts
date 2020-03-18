import { State } from "./state";
import { Patient, Entry, Diagnosis } from "../types";

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: diagnoses,
  }
}

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients,
  }
}

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient,
  }
}

export const updatePatient = (patient: Patient): Action => {
  return {
    type: "UPDATE_PATIENT",
    payload: patient,
  }
}

export const addEntry = (patient: Patient, entry: Entry): Action => {
  return {
    type: "ADD_ENTRY",
    payload: { patient, entry }
  }
}

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "UPDATE_PATIENT";
    payload: Patient;
  } | {
    type: "ADD_ENTRY";
    payload: { patient: Patient, entry: Entry };
  } | {
    type: "SET_DIAGNOSES";
    payload: Diagnosis[];
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY":
      const patient = action.payload.patient;
      const entry = action.payload.entry;
      return {
        ...state,
        patients: {
          ...state.patients,
          [patient.id]: {
            ...patient,
            entries: patient.entries.concat(entry),
          }
        }
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: action.payload,
      }
    default:
      return state;
  }
};
