import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { HttpModule } from '../infrastructure/modules/http/http.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from '../infrastructure/modules/user/user.module';
import { ToastModule } from '../infrastructure/modules/toast/toast.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    UserModule.forRoot(),
    AppRoutingModule,
    HttpModule.with({
      baseUrl: environment.apiBaseUrl,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
