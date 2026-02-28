const sessionModel = require('./model');

exports.saveSession = (req, res) => {
    const sessionData = req.body;

    sessionModel.save(sessionData);

    res.json({ message: "Session saved successfully" });
};

exports.getSessions = (req, res) => {
    const sessions = sessionModel.getAll();
    res.json(sessions);
};