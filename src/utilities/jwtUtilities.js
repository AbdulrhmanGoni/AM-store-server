import jwt from "jsonwebtoken";

const DEFAULT_JWT_KEY = "default-jwt-key"

export function generateJWT(payload, expiresIn = "30d") {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY || DEFAULT_JWT_KEY, { expiresIn });
}

export function verifyJWT(token) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY || DEFAULT_JWT_KEY)
}
