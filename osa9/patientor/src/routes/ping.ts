import express from 'express';

const router = express.Router();

router.get('/', (_, res) => {
    console.log('ping');
    res.send('pong');
});

export default router;
