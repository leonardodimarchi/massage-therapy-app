import { HttpClient } from "@angular/common/http";
import { Injectable, Inject, Optional } from "@angular/core";
import { HttpServiceInterface } from "@domain/contracts/services";
import { lastValueFrom } from "rxjs";
import { HttpConfig } from "@infra/modules/http/contracts/http_config.interface";
import { HTTP_MODULE_CONFIG } from "@infra/modules/http/tokens/http_config_injection_token";

@Injectable()
export class HttpService implements HttpServiceInterface {

  constructor(
    private readonly httpClient: HttpClient,

    @Inject(HTTP_MODULE_CONFIG)
    @Optional()
    protected readonly config?: HttpConfig,
  ) {}

  async post<ReturnType>(url: string, payload: object): Promise<ReturnType> {
    const finalUrl = this.config?.baseUrl + url;

    return await lastValueFrom<ReturnType>(
      this.httpClient.post<ReturnType>(finalUrl, payload)
    );
  }
}
