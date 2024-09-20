const express = require('express')
const authRoutes = require('./auth.route')

const router = express();


router.use('/auth', authRoutes)

module.exports = router;