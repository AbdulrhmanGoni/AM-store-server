import { rateLimit } from 'express-rate-limit';
import genTime from '../utilities/genTime.js';

export default function emailVerificationLimit() {
    return rateLimit({
        windowMs: genTime("hours", 1),
        limit: 5,
        standardHeaders: 'draft-7',
        legacyHeaders: false
    })
}