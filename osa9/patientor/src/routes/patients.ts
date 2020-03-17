import express from 'express';
import patientsService from '../services/patients';
import { validateString } from '../utils/utils';

const router = express.Router();

router.get('/', (_, res) => {
    const patients = patientsService.getAll();
    res.json(patients);
})



router.post('/', (req, res) => {
    const { name, ssn, dateOfBirth, occupation, gender } = req.body;

    if (
        !validateString('name', name, res) ||
        !validateString('ssn', ssn, res) ||
        !validateString('dateOfBirth', dateOfBirth, res) ||
        !validateString('occupation', occupation, res) ||
        !validateString('gender', gender, res)) {
        return;
    };

    const newPatient = patientsService.add({
        name,
        ssn,
        dateOfBirth,
        occupation,
        gender
    });

    res.send(newPatient);
});

export default router;
