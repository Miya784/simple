const validTopics = ["Light", "LightPWM", "Fan" , "RemoteAir" , "GateControl" , "Camera"];

const validateTopic = (req, res, next) => {
    const { topic } = req.params;
    if (!validTopics.includes(topic)) {
        return res.status(400).send("Invalid topic.");
    }
    next();
};

export default validateTopic;
