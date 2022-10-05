export interface HttpServiceInterface {
    post<ReturnType>(url: string, payload: object): Promise<ReturnType>;
}