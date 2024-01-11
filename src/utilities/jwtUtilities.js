import jwt from "jsonwebtoken";

export function generateJWT(payload, expiresIn = "30d") {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
}

export function verifyJWT(token) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY)
}
