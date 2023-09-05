import { ResponseWrapper } from './response-wrapper.model';
export declare class ErrorResponseWrapper<T> extends ResponseWrapper<T> {
    message: string;
    data: T;
    success: boolean;
    constructor(message: string, data: T, success?: boolean);
}
