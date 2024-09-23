const jwt = require('jsonwebtoken');
const config = require('../config/env-variables');
const redis = require('../config/redis');


exports.createResponse = (res, status, msg, payload, other) => {
    return res.status(status).json({
        status,
        message: msg,
        data: payload,
        ...other
    })
}
exports.createError = (res, status, error, options = undefined) => {
    if (!options) options = {};
    if (!options.other) options.other = {};

    const message = (error && error.message) || (isString(error) && error) || options.message || "Error Occured";

    const stackTrace = error || message;

    console.log("Error: ", message, stackTrace);

    res.locals.errorStr = message;

    const other = {
        ...options.other,
        ...(options.returnStackTrace ? { error: error.message } : {})
    }

    return exports.createResponse(
        res,
        status,
        message,
        other,
    )
}

exports.handleControllerError = (error) => {
    if (error.details && error.details.length > 0) {
        for (const err of error.details) {
            err.message = err.message.replace(/\"/g, "");
            return err;
        }
    } else {
        return error;
    }
}

exports.generateTokens = async (userId) => {
    const accessToken = jwt.sign({ userId }, config.ACCESS_TOKEN, {
        expiresIn: '15m'
    })

    const refreshToken = jwt.sign({ userId }, config.REFRESH_TOKEN, {
        expiresIn: '7d'
    })

    return { accessToken, refreshToken }
}

exports.storeRefreshToken = async (userId, refreshToken) => {
    await redis.set(`refresh_token: ${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60)
}

exports.setCookies = async (res, accessToken, refreshToken) => {
    res.cookie('accessToken', accessToken, {
        httpOnly: true, // prevents XSS attacks - cross site scripting attacks
        secure: config.NODE_ENV === 'production',
        sameSite: 'strict', //prevents CSRF - cross-site request forgery,
        maxAge: 15 * 60 * 1000 // 15 mins
    })

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true, // prevents XSS attacks - cross site scripting attacks
        secure: config.NODE_ENV === 'production',
        sameSite: 'strict', //prevents CSRF - cross-site request forgery,
        maxAge: 7 * 24 * 60 * 60 // 7 days
    })
}