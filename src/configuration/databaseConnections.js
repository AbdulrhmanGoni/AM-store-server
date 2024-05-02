import { connect } from "mongoose";

let MONGO_DB_LINK = "mongodb://mongodbPrimary/?directConnection=true";

if (process.env.DATABASE_CONNECTION_TYPE === "remote") {
    MONGO_DB_LINK = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
}

connect(MONGO_DB_LINK)
    .then(() => { console.log("connected to Mongodb successfully") })
    .catch((err) => { console.log("failed database connection", err.message) })
