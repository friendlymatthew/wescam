export class ResponseWrapper<T> {
  constructor(
    public message: string,
    public data: T,
    public success: boolean = true,
  ) {}
}
