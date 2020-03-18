import express from 'express';
import patientsService from '../services/patients';
import { validateHealthRating, validateString, validateGender, validateStringArray, validateEntryType } from '../utils/utils';
import { EntryType, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry } from '../types/entry';
import { v4 as uuid } from 'uuid';

const router = express.Router();

router.get('/', (_, res) => {
    const patients = patientsService.getAll();
    res.json(patients);
});

router.get('/:id/entries', (req, res) => {
    const id = req.params.id;
    if (id === undefined) {
        res.json({ error: "missing id" });
        return;
    }

    const entries = patientsService.getEntries(id);
    if (entries === undefined) {
        res.json({ error: "invalid id" });
        return;
    }

    console.log('sent', entries);
    res.send(entries);
})

router.post('/:id/entries', (req, res) => {
    const id = req.params.id;
    if (id === undefined) {
        res.json({ error: "missing id" });
        return;
    }

    const patient = patientsService.get(id);
    if (patient === undefined) {
        res.json({ error: 'invalid id' });
        return;
    }

    const { date, type, specialist, diagnosisCodes, description } = req.body;

    if (!validateString('date', date, res) ||
        !validateEntryType('type', type, res) ||
        !validateString('specialist', specialist, res) ||
        !validateStringArray('diagnosisCodes', diagnosisCodes, res) ||
        !validateString('description', description, res)) {
        return;
    }

    const baseEntry = {
        date,
        specialist,
        diagnosisCodes,
        description,
    };

    switch (type) {
        case EntryType.Hospital:
            const { discharge } = req.body;
            if (discharge === undefined) {
                res.json({ error: 'missing object discharge' });
                return;
            }
            if (typeof discharge !== 'object') {
                res.json({ error: 'discharge is not an object' });
                return;
            }
            const { date, criteria } = discharge;

            if (!validateString('discharge date', date, res) ||
                !validateString('discharge criteria', criteria, res)) {
                return;
            }
            const hospitalEntry: HospitalEntry = {
                ...baseEntry,
                id: uuid(),
                discharge: {
                    date, criteria
                },
                type,
            };
            const hospitalPatient = patientsService.addEntry(patient, hospitalEntry);
            res.send(hospitalPatient);
            break;
        case EntryType.HealthCheck:
            const { healthCheckRating } = req.body;
            if (!validateHealthRating(healthCheckRating, res)) {
                return;
            }
            const healthCheckEntry: HealthCheckEntry = {
                ...baseEntry,
                id: uuid(),
                healthCheckRating,
                type,
            };
            const healthCheckPatient = patientsService.addEntry(patient, healthCheckEntry);
            res.send(healthCheckPatient);
            break;
        case EntryType.OccupationalHealthcare:
            const { employerName, sickLeave } = req.body;
            if (!validateString('employerName', employerName, res)) {
                return;
            }
            if (sickLeave === undefined) {
                const occupationEntry: OccupationalHealthcareEntry = {
                    ...baseEntry,
                    id: uuid(),
                    employerName,
                    type,
                }
                const occuPatient = patientsService.addEntry(patient, occupationEntry);
                res.send(occuPatient);
            } else {
                const { startDate, endDate } = sickLeave;
                if (!validateString('startDate', startDate, res) ||
                    !validateString('endDate', endDate, res)) {
                    return;
                }

                const occupationEntry: OccupationalHealthcareEntry = {
                    ...baseEntry,
                    id: uuid(),
                    employerName,
                    type,
                    sickLeave: {
                        startDate,
                        endDate,
                    },
                }
                const occuPatient = patientsService.addEntry(patient, occupationEntry);
                res.send(occuPatient);
            }
            break;
        default:
            const n: never = type;
            throw new Error('never type');
    }
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    if (id === undefined) {
        res.json({ error: "missing id" });
        return;
    }

    const patient = patientsService.get(id);
    if (patient === undefined) {
        res.json({ error: "invalid id" });
        return;
    }

    console.log('sent', patient);
    res.send(patient);
});

router.post('/', (req, res) => {
    const { name, ssn, dateOfBirth, occupation, gender } = req.body;

    if (
        !validateString('name', name, res) ||
        !validateString('ssn', ssn, res) ||
        !validateString('dateOfBirth', dateOfBirth, res) ||
        !validateString('occupation', occupation, res) ||
        !validateGender(gender, res)) {
        return;
    };

    const newPatient = patientsService.add({
        name,
        ssn,
        dateOfBirth,
        occupation,
        gender,
        entries: [],
    });

    res.send(newPatient);
});

export default router;
