import express from 'express';
import pingRouter from './routes/ping';
import diagnoseRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors());
app.use('/api/ping', pingRouter);
app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientsRouter);

const PORT = 3001;
app.listen(PORT, () => {
    console.log('running');
});