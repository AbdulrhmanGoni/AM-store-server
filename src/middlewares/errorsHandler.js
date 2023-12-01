import findErrorPlace from "../utilities/findErrorPlace.js";

export default async function errorsHandler(err, _req, res, _next) {

    const errorResposne = {
        message: err.message,
        statusCode: err.statusCode,
        status: err.status
    }

    if (process.env.NODE_ENV == "development") {
        Object.assign(errorResposne, {
            errorPlace: findErrorPlace(err.stack),
            stack: err.stack
        })
    }

    res.status(err.statusCode).json(errorResposne)
}