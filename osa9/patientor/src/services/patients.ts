import initialPatients from '../../data/patients';
import Patient, { PatientNoSSN, NewPatient } from '../types/patient';
import Entry from '../types/entry';

let patients = initialPatients;

const getAll = (): Array<PatientNoSSN> => {
    return patients.map(p => {
        const { ssn, ...rest } = p;
        return rest;
    });
};

const get = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
}

const getEntries = (id: string): Entry[] | undefined => {
    const patient = get(id);
    if (patient === undefined) {
        return undefined;
    }

    return patient.entries;
}

const add = (newPatient: NewPatient): Patient => {
    const patient: Patient = {
        id: String(patients.length),
        ...newPatient,
    };
    patients = patients.concat(patient);
    return patient;
}

const addEntry = (patient: Patient, entry: Entry): Patient => {
    const updatedPatient: Patient = {
        ...patient,
        entries: patient.entries.concat(entry),
    }
    patients = patients.filter(p => p.id !== patient.id).concat(updatedPatient);
    return updatedPatient;
}

export default { getAll, get, add, getEntries, addEntry };
