import express from 'express';
import patientsService from '../services/patients';
import { validateString, validateGender } from '../utils/utils';

const router = express.Router();

router.get('/', (_, res) => {
    const patients = patientsService.getAll();
    res.json(patients);
});

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
