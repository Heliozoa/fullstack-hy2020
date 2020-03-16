import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json())

app.get('/hello', (_, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (height && weight) {
        const bmi = calculateBmi(height, weight);
        res.json({
            weight,
            height,
            bmi,
        });
    } else {
        res.json({
            error: 'malformatted parameters',
        });
    }
});

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body;

    if (daily_exercises == null || target == null) {
        res.json({
            error: "missing parameters"
        });
        return;
    }

    if (!Array.isArray(daily_exercises) || daily_exercises.map(h => typeof h != 'number').reduce((acc, curr) => acc || curr) || typeof target != 'number') {
        res.json({
            error: "malformed parameters"
        });
        return;
    }

    const result = calculateExercises(daily_exercises, target);
    res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
