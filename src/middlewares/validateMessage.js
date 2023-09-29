const validMessages = {
    "Light": ["On", "Off"],
    "LightPWM": Array.from({ length: 256 }, (_, i) => i.toString()), // ["0", "1", ..., "255"]
    "Fan": ["Off","Ch1", "Ch2", "Ch3"],
    "RemoteAir": ["On","Off","Up","Down"],
    "GateControl":["On","Off"],
    "Camera":["sendImage"]
};

const validateMessage = (req, res, next) => {
    const { topic, message } = req.params;

    if (!validMessages[topic].includes(message)) {
        return res.status(400).send(`Invalid message for topic "${topic}".`);
    }

    next();
};

export default validateMessage;
