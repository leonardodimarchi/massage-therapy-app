import { UserModule } from '@infra/modules/user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { environment } from "@env/environment";
import { HttpModule } from "@infra/modules/http/http.module";
import { ToastModule } from "@infra/modules/toast/toast.module";
import { AppRoutingModule } from "@presenter/app-routing.module";
import { AppComponent } from "@presenter/app.component";
import { NgxMaskModule } from 'ngx-mask';
import { BackButtonModule } from '@infra/modules/back-button/back-button.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    UserModule.forRoot(),
    NgxMaskModule.forRoot(),
    BackButtonModule,
    AppRoutingModule,
    HttpModule.with({
      baseUrl: environment.apiBaseUrl,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
