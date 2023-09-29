import express from 'express';
import { mqttClient, lastReceivedMessage } from '../config/mqttSetup.js';
import validateTopic from '../middlewares/validateTopic.js';
import validateMessage from '../middlewares/validateMessage.js';

const router = express.Router();

router.get('/publish/:topic/:message',validateTopic, validateMessage, express.json(), (req, res) => {

    const { topic,message } = req.params;
    const mqttTopic = `${topic}/topic`

    mqttClient.publish( mqttTopic, message, {}, (error) => {
        if (error) {
            console.error('Failed to publish message:', error);
            return res.status(500).send('Failed to publish message.');
        } else {
            console.log('Message sent:',mqttTopic, message);
            res.send(`Message sent to ${mqttTopic} : ${message}`);
        }
    });
});

router.get('/latest', (req, res) => {
    res.send(`Latest received message: ${lastReceivedMessage}`);
});

export default router;
