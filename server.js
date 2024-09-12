import express from 'express';
import fs from 'fs';
import path from 'path';
import { localhost, path as dataPath } from './config_setting.mjs';

const app = express();
const PORT = localhost;
const DATA_FOLDER = path.join(process.cwd(), dataPath); 


app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

// Головний маршрут
app.get('/', (req, res) => {
    fs.readdir(DATA_FOLDER, (err, files) => {
        if (err) {
            return res.status(500).send('not find folder');
        }

        const supportedExtensions = ['.sql', '.sqlite', '.db', '.csv', '.json'];
        const filteredFiles = files.filter(file => supportedExtensions.includes(path.extname(file).toLowerCase()));
        res.render('index', { files: filteredFiles });
    });
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}/`);
});
