import { ResponseWrapper } from './response-wrapper.model';

export class ErrorResponseWrapper<T> extends ResponseWrapper<T> {
  constructor(
    public message: string,
    public data: T,
    public success: boolean = false,
  ) {
    super(message, data, success);
  }
}
