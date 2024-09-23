const config = require("../config/env-variables");
const redis = require("../config/redis");
const User = require("../models/user.model");
const { handleControllerError } = require("../utils/helpers");
const jwt = require('jsonwebtoken')


const authCtrl = {
    signUp,
    login,
    logout
}

module.exports = authCtrl;

async function signUp(req, res) {
    try {
        const { email, password, name } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            throw Error("User already exists")
        }

        const user = new User({ email, name, password });
        await user.save();

        delete user.password
        return user
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function login(req) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user && !(await user.comparePassword(password))) {
            throw Error('Invalid credentials')
        }
        delete user.password
        return user
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function logout(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            const decoded = jwt.verify(refreshToken, config.REFRESH_TOKEN);
            await redis.del(`refresh_token: ${decoded.userId}`)
        }

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return true; f
    } catch (e) {
        throw handleControllerError(e)
    }
}