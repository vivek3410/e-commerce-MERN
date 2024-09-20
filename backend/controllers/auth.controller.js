const { handleControllerError } = require("../utils/helpers");


const authCtrl = {
    signUp
}
module.exports = authCtrl;


async function signUp(req) {
    try {
        return true
    } catch (e) {
        throw handleControllerError(e)
    }
}