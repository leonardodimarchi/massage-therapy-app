import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { UserRepositoryInterface } from "@domain/contracts/repositories";
import { UserServiceInterface, HttpServiceInterface } from "@domain/contracts/services";
import { LoginUsecase } from "@domain/usecases/user/login_usecase";
import { UserDatasourceInterface } from "@infra/contracts/datasources";
import { UserDatasource } from "@infra/datasources/user/user_datasource";
import { HttpService } from "@infra/modules/http/services/http_service";
import { LoadingSpinnerModule } from "@infra/modules/loading/loading.module";
import { UserRepository } from "@infra/repositories/user/user_repository";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    LoadingSpinnerModule,
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    {
      provide: LoginUsecase,
      useFactory: (repo: UserRepositoryInterface, userService: UserServiceInterface) => {
        return new LoginUsecase(repo, userService);
      },
      deps: [UserRepositoryInterface, UserServiceInterface],
    },
    {
      provide: UserRepositoryInterface,
      useFactory: (datasource: UserDatasourceInterface) => new UserRepository(datasource),
      deps: [UserDatasource],
    },
    {
      provide: UserDatasource,
      useFactory: (httpService: HttpServiceInterface) => new UserDatasource(httpService),
      deps: [HttpService],
    },
  ],
})
export class LoginModule { }
