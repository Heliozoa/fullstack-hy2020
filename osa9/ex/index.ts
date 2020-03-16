import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

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
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
