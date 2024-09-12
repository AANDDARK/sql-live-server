import * as fs from 'fs';

function loadConfig() {
    const rawData = fs.readFileSync('livesql.config.json');
    return JSON.parse(rawData);
}

const config = loadConfig();
const localhost = config.localhost;
const path = config.path;

export { localhost, path };
