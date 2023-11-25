const
    userName = process.env.DB_USERNAME,
    password = process.env.DB_PASSWORD,
    database = process.env.DB_NAME

const MONGO_DB_LINK = `mongodb+srv://${userName}:${password}@am-store.v4hcite.mongodb.net/${database}?retryWrites=true&w=majority`;

export default MONGO_DB_LINK;