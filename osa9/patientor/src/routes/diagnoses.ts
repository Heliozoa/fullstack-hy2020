import express from 'express';
import diagnosesService from '../services/diagnoses';

const router = express.Router();

router.get('/', (_, res) => {
    const diagnoses = diagnosesService.getAll();
    res.json(diagnoses);
})

export default router;
