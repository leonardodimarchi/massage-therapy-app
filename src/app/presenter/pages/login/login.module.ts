import { HttpService } from './../../../infrastructure/services/http/http_service';
import { UserDatasource } from './../../../infrastructure/datasources/user/user_datasource';
import { UserDatasourceInterface } from './../../../infrastructure/contracts/datasources/user_datasource.interface';
import { UserRepositoryInterface } from 'src/app/domain/contracts/repositories/user_repository.interface';
import { LoginUsecase } from './../../../domain/usecases/user/login_usecase';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { UserRepository } from 'src/app/infrastructure/repositories/user/user_repository';
import { HttpServiceInterface } from 'src/app/infrastructure/contracts/services/http/http_service.interface';


@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    {
      provide: LoginUsecase,
      useFactory: (repo: UserRepositoryInterface) => new LoginUsecase(repo),
      deps: [UserRepository],
    },
    {
      provide: UserRepository,
      useFactory: (datasource: UserDatasourceInterface) => new UserRepository(datasource),
      deps: [UserDatasource],
    },
    {
      provide: UserDatasource,
      useFactory: (httpService: HttpServiceInterface) => new UserDatasource(httpService),
      deps: [HttpService],
    },
    HttpService,
  ],
})
export class LoginModule { }
