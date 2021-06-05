export class ErrorDTO {
    public code: string;
    public msg: {};
}

export class ResponseDTO {
    public transId: string;
    public code: string;
    public msg: string;
    public body: {};
    public error: ErrorDTO;

}