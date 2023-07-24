import jwt from "jsonwebtoken"

export default async function adminAuth(req, res, next) {
    try {
        const codded = await jwt.verify(req.headers["access-token"], process.env.JWT_SECRET_KEY)
        if (codded.role === "admin") {
            next();
        } else res.status(401).json({ message: "you don't have access to this rout" });
    } catch (error) {
        console.log(error);
        res.status(400).json(false);
    }
};
