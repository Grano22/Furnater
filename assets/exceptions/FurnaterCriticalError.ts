export default class FurnaterCriticalError extends Error {
    constructor(mess) {
        super(mess);
        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}