class ErrorGenerator extends Error {
    constructor(message = "Unexpected Error", statusCode = 500) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.status = String(statusCode).startsWith("4") ? "Fail" : "Error";
    }
}

export default ErrorGenerator;