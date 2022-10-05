import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { HttpServiceInterface } from "../../contracts/services/http/http_service.interface";

export class HttpService implements HttpServiceInterface {

    constructor(
        private readonly httpClient: HttpClient,
    ) {}

    async post<ReturnType>(url: string, payload: object): Promise<ReturnType> {
        return await lastValueFrom<ReturnType>(this.httpClient.post<ReturnType>(url, payload));
    }
}