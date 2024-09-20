

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