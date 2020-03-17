type Entry = OccupationalHealthCareEntry | HospitalEntry | HealthCheckEntry;

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

export default Entry;