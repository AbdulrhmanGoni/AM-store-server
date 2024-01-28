import express, { json } from "express";
import "./configuration/index.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mainRouter from "./routers/index.js";
import corsWhitelist from "./CONSTANT/corsWhitelist.js";
import sanitizer from "express-mongo-sanitize";
import { xss } from "express-xss-sanitizer";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import errorsHandler from "./middlewares/errorsHandler.js";
import genTime from "./utilities/genTime.js";

const app = express();

// middleware
app.use([
    cors({ origin: corsWhitelist, credentials: true }),
    rateLimit({ limit: 20000, windowMs: genTime("hours", 12) }),
    json({ limit: "5kb" }),
    sanitizer(), // a middleware prevents noSQL injection.
    hpp(), // a middleware protect against HTTP Parameter Pollution attacks.
    xss(), // a middleware prevents Cross Site Scripting (XSS) attack.
    cookieParser()
]);

// Main Routers
app.use("/api", mainRouter)

app.all("*", (_req, res) => {
    const message = "Sorry, the content you're looking for doesn't exist."
    res.status(404).json({ message, status: 404 })
});

// For catching unhandled rejections from express.js
app.use(errorsHandler);

export default app;