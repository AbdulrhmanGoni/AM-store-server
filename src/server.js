import app from "./app.js";

// listenig
const PORT = +process.env.PORT || 7000;

const server = app.listen(PORT, async () => {
    console.log("Server running on http://localhost:" + PORT);
});

export default server