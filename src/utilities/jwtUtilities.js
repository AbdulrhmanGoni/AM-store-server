import jwt from "jsonwebtoken";

export function generateJWTToken(payload, expiresIn = "30d") {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
}

export function verifyJWTToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY)
}
