import express from 'express';
import patientsService from '../services/patients';

const router = express.Router();

router.get('/', (_, res) => {
    const patients = patientsService.getAll();
    res.json(patients);
})

export default router;
