import jwt from "jsonwebtoken"

export default async function userAuth(req, res, next) {
    const errMessage = { message: "you don't have access to this rout" }
    try {
        const verifiction = await jwt.verify(req.headers["access-token"], process.env.JWT_SECRET_KEY)
        if (verifiction.role === "user") {
            next();
        } else res.status(401).json(errMessage);
    } catch (error) {
        res.status(401).json(errMessage);
    }
};
