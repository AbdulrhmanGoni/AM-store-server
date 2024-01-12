import extractAuthFromRequestHeaders from "../utilities/extractAuthFromRequestHeaders.js";
import { verifyJWT } from "../utilities/jwtUtilities.js";

export default async function authenticate(req, res, next) {
    const unAuthorizedMsg = { message: "You need some credentials first to access this api" }
    const { accessToken } = extractAuthFromRequestHeaders(req)
    if (accessToken) {
        try {
            const token = verifyJWT(accessToken)
            if (token.userId || token.adminId) {
                req.userId = token.userId; next();
            } else { res.status(401).json({ message: "There is problem in your credentials" }) }
        } catch {
            res.status(401).json(unAuthorizedMsg)
        }
    } else res.status(401).json(unAuthorizedMsg)
};
