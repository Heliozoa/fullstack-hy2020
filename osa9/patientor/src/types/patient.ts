interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
};

export type PatientNoSSN = Omit<Patient, 'ssn'>;

export default Patient;
