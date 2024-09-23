const express = require('express')
const { createError, createResponse, generateTokens, storeRefreshToken, setCookies } = require('../utils/helpers')
const { resStatusCode, resMsg } = require('../config/constants')
const authCtrl = require('../controllers/auth.controller')

const router = express.Router()

router.post('/signup', signUp)

router.post('/login', login)

router.post('/logout', logout)



async function signUp(req, res, next) {
    try {
        let response = await authCtrl.signUp(req);

        if (response) {
            const userId = response._id
            const { accessToken, refreshToken } = await generateTokens(userId)
            await storeRefreshToken(userId, refreshToken)
            setCookies(res, accessToken, refreshToken)

            return createResponse(res, resStatusCode.SIGN_UP, resMsg.SIGN_UP, response)
        } else {
            return createResponse(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
        }
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function login(req, res, next) {
    try {
        let response = await authCtrl.login(req);
        if (response) {
            const userId = response._id
            const { accessToken, refreshToken } = await generateTokens(userId)
            await storeRefreshToken(userId, refreshToken)
            setCookies(res, accessToken, refreshToken)

            return createResponse(res, resStatusCode.LOGIN, resMsg.LOGIN, response);
        }
        else
            return createResponse(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function logout(req, res, next) {
    try {
        let response = await authCtrl.logout(req, res);
        if (response) {
            return createResponse(res, resStatusCode.LOGOUT, resMsg.LOGOUT, response);
        }
        else
            return createResponse(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}



module.exports = router