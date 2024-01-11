import { verifyJWT } from "../utilities/jwtUtilities.js";

export default async function adminAuth(req, res, next) {
    const unAuthorizedMsg = { message: "You need some credentials first to access this api" };
    const accessToken = req.headers["access-token"];
    const tokenId = req.headers["token-id"];
    if (accessToken && tokenId) {
        try {
            const token = verifyJWT(accessToken)
            if (token.role === "admin" && tokenId === token.adminId) {
                req.adminId = token.adminId; next();
            } else if (token.role === "user") {
                res.status(401).json({ message: "You are not admin" });
            }
            else res.status(401).json(unAuthorizedMsg);
        } catch (error) {
            res.status(401).json(unAuthorizedMsg);
        }
    } else return res.status(401).json(unAuthorizedMsg)
};
