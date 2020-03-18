export type Entry = OccupationalHealthcareEntry | HospitalEntry | HealthCheckEntry;

interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
  description: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
  type: "OccupationalHealthcare";
}

export interface HospitalEntry extends BaseEntry {
  discharge: {
    date: string,
    criteria: string,
  };
  type: "Hospital";
}

export enum HealthRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  healthCheckRating: HealthRating;
  type: "HealthCheck";
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
};

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
};

export interface Error {
  error: string,
};
