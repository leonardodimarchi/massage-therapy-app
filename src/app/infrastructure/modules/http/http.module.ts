import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { UserServiceInterface } from "@domain/contracts/services";
import { HttpConfig } from "@infra/modules/http/contracts/http_config.interface";
import { UserTokenInterceptor } from "@infra/modules/http/interceptors/user-token.interceptor";
import { HttpService } from "@infra/modules/http/services/http_service";
import { HTTP_MODULE_CONFIG } from "@infra/modules/http/tokens/http_config_injection_token";

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    HttpService,
  ],
})
export class HttpModule {

  public static with(configValue: HttpConfig | (() => HttpConfig)): ModuleWithProviders<HttpModule> {
    return {
      ngModule: HttpModule,
      providers: [
        {
          provide: HTTP_MODULE_CONFIG,
          useValue: configValue,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: UserTokenInterceptor,
          deps: [UserServiceInterface],
          multi: true
        },
        HttpService,
      ],
    };
  }
}
