import extractAuthFromRequestHeaders from "../utilities/extractAuthFromRequestHeaders.js";
import { verifyJWT } from "../utilities/jwtUtilities.js";

export default async function adminAuth(req, res, next) {
    const unAuthorizedMsg = { message: "You need some credentials first to access this api" };
    const failedToAuthorizeMsg = { message: "Invalid credentials!, Failed to authorize you" };
    const { accessToken } = extractAuthFromRequestHeaders(req)
    if (accessToken) {
        try {
            const token = verifyJWT(accessToken)
            if (token.role === "admin") {
                req.adminId = token.adminId; next();
            } else if (token.role === "user") {
                res.status(401).json({ message: "You are not admin" });
            }
            else res.status(401).json(failedToAuthorizeMsg);
        } catch (error) {
            console.log(error)
            res.status(401).json(failedToAuthorizeMsg);
        }
    } else return res.status(401).json(unAuthorizedMsg)
};
