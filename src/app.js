import express, { json } from "express";
import "./utilities/databaseConnections.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import API_Router from "./routers/index.js";
import corsWhitelist from "./CONSTANT/corsWhitelist.js";
import sanitizer from "express-mongo-sanitize";
import { xss } from "express-xss-sanitizer";
import hpp from "hpp";
import ErrorGenerator from "./utilities/ErrorGenerator.js";
import errorsHandler from "./middlewares/errorsHandler.js";

const app = express();

// middleware
app.use([
    sanitizer(), // a middleware prevents noSQL injection.
    json({ limit: "5kb" }),
    hpp(), // a middleware protect against HTTP Parameter Pollution attacks.
    xss(),// a middleware prevents Cross Site Scripting (XSS) attack.
    cookieParser(),
    cors({ origin: corsWhitelist, credentials: true })
]);

// Main Routers
app.use("/api", API_Router)

app.use("*", (_req, _res, next) => {
    const message = "Sorry, the content you're looking for doesn't exist.";
    const error = new ErrorGenerator(message, 404);
    next(error);
});

// For catching unhandled rejections from express.js
app.use(errorsHandler);


export default app;