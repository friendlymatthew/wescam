export declare class ResponseWrapper<T> {
    message: string;
    data: T;
    success: boolean;
    constructor(message: string, data: T, success?: boolean);
}
