const express = require('express')
const { createError, createResponse } = require('../utils/helpers')
const { resStatusCode, resMsg } = require('../config/constants')
const authCtrl = require('../controllers/auth.controller')

const router = express.Router()

router.post('/signup', signUp)


async function signUp(req, res, next) {
    try {
        let response = await authCtrl.signUp(req);
        if (response) return createResponse(res, resStatusCode.SIGN_UP, resMsg.SIGN_UP, response);
        else
            return createResponse(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

module.exports = router