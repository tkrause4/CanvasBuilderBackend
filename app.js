require('dotenv').config()

const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const cors = require("cors");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.error('Mit der Datenbank verbunden'))

app.use(express.json());
app.use(cors());

const canvasRouter = require('./routes/canvases')
app.use('/canvases', canvasRouter)

const templateRouter = require('./routes/templates')
app.use('/templates', templateRouter)

app.listen(port, () => {
    console.log('Der Server läuft auf Port:' + port)
})