import Entry from './entry';

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}


interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
};

export type PatientNoSSN = Omit<Patient, 'ssn'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>

export type NewPatient = Omit<Patient, 'id'>;

export default Patient;
