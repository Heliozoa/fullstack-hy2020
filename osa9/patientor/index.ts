import express from 'express';

const app = express();
app.use(express.json());

app.get('/ping', (_, res) => {
    console.log('ping');
    res.send('pong');
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log('running');
});