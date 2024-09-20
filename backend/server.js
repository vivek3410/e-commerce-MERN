const config = require('./config/env-variables');
const app = require('./config/express');
const logger = require('./config/logger');


const PORT = config.PORT;

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
})