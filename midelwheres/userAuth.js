import jwt from "jsonwebtoken"

export default async function userAuth(req, res, next) {
    console.log("userAuth done!")
    try {
        const verifiction = await jwt.verify(req.headers["access-token"], process.env.JWT_SECRET_KEY)
        if (verifiction.role === "user") {
            console.log(verifiction)
            next();
        } else res.status(401).json({ message: "you don't have access to this rout" });

    } catch (error) {
        console.log(error);
        res.status(400).json(false);
    }
};
