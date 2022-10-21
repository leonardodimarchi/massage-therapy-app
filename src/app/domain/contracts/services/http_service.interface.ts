export abstract class HttpServiceInterface {
    abstract post<ReturnType>(url: string, payload: object): Promise<ReturnType>;
}