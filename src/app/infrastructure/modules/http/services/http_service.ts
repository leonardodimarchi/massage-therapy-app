import { HTTP_MODULE_CONFIG } from '../tokens/http_config_injection_token';
import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { HttpConfig } from '../contracts/http_config.interface';
import { HttpServiceInterface } from '../../../../domain/contracts/services/http_service.interface';

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
