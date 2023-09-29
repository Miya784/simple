import express from 'express';
import router from './src/Router/mqttRouter.js';

const app = express();
const PORT = 3000;

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
});
