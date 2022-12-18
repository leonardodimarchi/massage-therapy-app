export abstract class HttpServiceInterface {
    abstract post<ReturnType>(url: string, payload: object): Promise<ReturnType>;
    abstract get<ReturnType>(url: string): Promise<ReturnType>;
}
