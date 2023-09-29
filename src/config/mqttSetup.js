import { connect } from 'mqtt';

const brokerUrl = 'mqtt://localhost:1883';
const mqttClient = connect(brokerUrl, {
    clientId: 'express-client',
    username: 'burhan',
    password: 'burhan'
});

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');

    // Subscribing to multiple topics
    const topics = ['test/topic', 'Light/topic', 'LightPWM/topic', 'Fan/topic','GateControl/topic','Camera/topic'];
    topics.forEach(topic => {
        mqttClient.subscribe(topic, (error) => {
            if (error) {
                console.error(`Failed to subscribe to ${topic}:`, error);
            } else {
                console.log(`Subscribed to ${topic}`);
            }
        });
    });
});

let lastReceivedMessage = '';
mqttClient.on('message', (topic, message) => {
    const messageStr = message.toString();
    console.log(`Received message on ${topic}: ${messageStr}`);
    lastReceivedMessage = messageStr;  // This will overwrite with the latest message received on any topic
});

export { mqttClient, lastReceivedMessage };
