import { HTTP_MODULE_CONFIG } from './tokens/http_config_injection_token';
import { HttpClientModule } from "@angular/common/http";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { HttpService } from "./services/http_service";
import { HttpConfig } from "./contracts/http_config.interface";

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
        HttpService,
      ],
    };
  }
}
