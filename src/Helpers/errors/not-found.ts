import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom-api-error';

class NotFound extends CustomAPIError {
    public statusCode: number;
    constructor(message: string) {
        super(message);
        // give statuscode not found
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}
export default NotFound;