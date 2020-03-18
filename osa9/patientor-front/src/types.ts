export type Entry = OccupationalHealthCareEntry | HospitalEntry | HealthCheckEntry;

interface BaseEntry {
  id: string;
  date: string;
  type: string;
  specialist: string;
  diagnosisCodes?: string[];
  description: string;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HospitalEntry extends BaseEntry {
  discharge: {
    date: string,
    criteria: string,
  };
}

export interface HealthCheckEntry extends BaseEntry {
  healthCheckRating: number;
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
