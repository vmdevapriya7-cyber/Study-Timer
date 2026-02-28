const fs = require("fs");
const path = "./data/sessions.json";

exports.save = (data) => {
    let sessions = [];

    if (fs.existsSync(path)) {
        const fileData = fs.readFileSync(path);
        sessions = JSON.parse(fileData);
    }

    sessions.push(data);

    fs.writeFileSync(path, JSON.stringify(sessions, null, 2));
};

exports.getAll = () => {
    if (!fs.existsSync(path)) return [];

    const fileData = fs.readFileSync(path);
    return JSON.parse(fileData);
};