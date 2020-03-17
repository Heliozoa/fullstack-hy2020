import initialPatients from '../../data/patients';
import Patient, { PatientNoSSN, NewPatient } from '../types/patient';

let patients = initialPatients;

const getAll = (): Array<PatientNoSSN> => {
    return patients.map(p => {
        delete p.ssn;
        return p;
    });
};

const get = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    console.log(patient);
    return patient;
}

const add = (newPatient: NewPatient): Patient => {
    const patient: Patient = {
        id: String(patients.length),
        ...newPatient,
    };
    patients = patients.concat(patient);
    return patient;
}

export default { getAll, get, add };
