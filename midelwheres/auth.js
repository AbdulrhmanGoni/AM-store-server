import jwt from "jsonwebtoken"

export default async function auth(req, res, next) {
    if (req.headers["access-token"]) {
        const verifiction = await jwt.verify(req.headers["access-token"], process.env.JWT_SECRET_KEY)
    }
    // const codded = wt.verify(req.headers["access-token"], )
    // console.log(codded)
    next();
};
