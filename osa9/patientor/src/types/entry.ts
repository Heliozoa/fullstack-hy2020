type Entry = OccupationalHealthcareEntry | HospitalEntry | HealthCheckEntry;

export enum EntryType {
    OccupationalHealthcare = "OccupationalHealthcare",
    Hospital = "Hospital",
    HealthCheck = "HealthCheck",
};

interface BaseEntry {
    id: string;
    date: string;
    specialist: string;
    diagnosisCodes?: string[];
    description: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: EntryType.OccupationalHealthcare;
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}

export interface HospitalEntry extends BaseEntry {
    type: EntryType.Hospital;
    discharge: {
        date: string,
        criteria: string,
    };
}

export enum HealthRating {
    Healthy = 0,
    LowRisk = 1,
    HighRisk = 2,
    CriticalRisk = 3,
}

export interface HealthCheckEntry extends BaseEntry {
    type: EntryType.HealthCheck;
    healthCheckRating: HealthRating;
}

export default Entry;