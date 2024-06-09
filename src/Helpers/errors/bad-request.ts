import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom-api-error';

class BadRequest extends CustomAPIError {
    public statusCode: number;
    constructor(message : string) {
        super(message);
        //give statuscode bad request
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}
export default BadRequest;