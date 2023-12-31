import jwt from "jsonwebtoken";

export default async function authenticate(req, res, next) {
    const unAuthorizedMsg = { message: "You need some credentials first to access this api" }
    const accessToken = req.headers["access-token"];
    const tokenId = req.headers["token-id"];
    if (accessToken) {
        try {
            const token = jwt.verify(accessToken, process.env.JWT_SECRET_KEY)
            if (token && (tokenId === token.userId)) {
                req.userId = token.userId; next();
            } else { res.status(401).json({ message: "There is problem in your credentials" }) }
        } catch {
            res.status(401).json(unAuthorizedMsg)
        }
    } else res.status(401).json(unAuthorizedMsg)
};
