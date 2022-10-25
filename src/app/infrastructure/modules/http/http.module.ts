import { UserServiceInterface } from 'src/app/domain/contracts/services/user_service.interface';
import { UserTokenInterceptor } from './interceptors/user-token.interceptor';
import { HTTP_MODULE_CONFIG } from './tokens/http_config_injection_token';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { HttpService } from "./services/http_service";
import { HttpConfig } from "./contracts/http_config.interface";
import { UserModule } from '../user/user.module';

@NgModule({
  imports: [
    HttpClientModule,
    UserModule,
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
