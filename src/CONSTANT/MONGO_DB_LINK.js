const
    userName = process.env.DB_USERNAME,
    password = process.env.DB_PASSWORD,
    databaseName = process.env.DB_NAME,
    atlas_cluster = process.env.ATLAS_CLUSTER

const mongodbLink = `mongodb+srv://${userName}:${password}@${atlas_cluster}.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

const localMongodbLink = "mongodb://abdulrhman:testing10@localhost:27017"

export default process.env.NODE_ENV === "jest-testing" ? localMongodbLink : mongodbLink;