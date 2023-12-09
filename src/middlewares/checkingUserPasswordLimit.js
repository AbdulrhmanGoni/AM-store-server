import { rateLimit } from 'express-rate-limit';
import genTime from '../utilities/genTime.js';

export default function checkingUserPasswordLimit() {
    return rateLimit({
        windowMs: genTime("hours", 12),
        limit: 5,
        standardHeaders: 'draft-7',
        legacyHeaders: false,
        statusCode: 400,
        message: {
            message: "You are blocked temporarily because you are trying to send too much check password requests, Come back after 12 hours and try again",
            status: false
        }
    })
}