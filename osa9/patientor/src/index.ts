import express from 'express';
import pingRouter from './routes/ping';
import diagnoseRouter from './routes/diagnose';

const app = express();
app.use(express.json());

app.use('/api/ping', pingRouter);
app.use('/api/diagnoses', diagnoseRouter);


const PORT = 3001;
app.listen(PORT, () => {
    console.log('running');
});