
async function sendFeedback(req, res) {
    try {
        const { title, subject, userEmail } = req.body;
        console.log(req.body)
        res.status(200).json(true);
    } catch (error) {
        console.log(error)
        res.status(200).json(null);
    }
}

export default sendFeedback;