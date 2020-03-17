import patients from '../../data/patients';
import { PatientNoSSN } from '../types/patient';

const getAll = (): Array<PatientNoSSN> => {
    return patients.map(p => {
        delete p.ssn;
        return p;
    });
};

export default { getAll };
