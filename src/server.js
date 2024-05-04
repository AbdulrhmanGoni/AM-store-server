import initializations from "./configuration/index.js";
import app from "./app.js";

async function startServer() {
    try {
        await initializations();

        const PORT = +process.env.PORT || 7000;
        return app.listen(PORT, async () => {
            console.log("Server running on http://localhost:" + PORT);
        });
    } catch (error) {
        console.log('Unhandled Rejection:', error);
    }

}

export default startServer();