import app from "./app.js";

// listenig
const PORT = +process.env.PORT || 7000;

const server = app.listen(PORT, async () => {
    console.log("Server running on http://localhost:" + PORT);
});

process.on("unhandledRejection", (err) => {
    console.log(`Unhandled Rejection Error: ${err.message}`)
    server.close(() => {
        console.log("Shuting down...")
        process.exit(1);
    })
})