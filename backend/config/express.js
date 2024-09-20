const express = require('express')
const router = require('../routes/index.route');
const logger = require('./logger');
const cors = require('cors')

const app = express();

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl} - Query: ${JSON.stringify(req.query)}`)
    next();
})

app.use(cors());

app.use(express.json());

app.use('/api/v1', router)


app.all('/api/v1/*', (req, res) => {
    return res.status(400).json({ status: 400, message: "Bad Request" })
})


module.exports = app;