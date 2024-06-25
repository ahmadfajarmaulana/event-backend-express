import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom-api-error';

class Unauthenticated extends CustomAPIError {
    public statusCode: number;
    constructor(message: string) {
        super(message);
        // give statuscode forbidden
        this.statusCode = StatusCodes.FORBIDDEN;
    }
}
export default Unauthenticated;