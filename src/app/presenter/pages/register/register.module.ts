import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { UserRepositoryInterface } from "@domain/contracts/repositories";
import { HttpServiceInterface } from "@domain/contracts/services";
import { RegisterUsecase } from "@domain/usecases/user/register_usecase";
import { UserDatasourceInterface } from "@infra/contracts/datasources";
import { UserDatasource } from "@infra/datasources/user/user_datasource";
import { HttpService } from "@infra/modules/http/services/http_service";
import { LoadingSpinnerModule } from "@infra/modules/loading/loading.module";
import { RoutingModule } from "@infra/modules/router/router.module";
import { UserRepository } from "@infra/repositories/user/user_repository";
import { HeaderModule } from "@presenter/components/header/header.module";
import { RegisterRoutingModule } from "./register-routing.module";
import { RegisterComponent } from "./register.component";

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    LoadingSpinnerModule,
    RoutingModule,
    HeaderModule,
  ],
  declarations: [
    RegisterComponent,
  ],
  providers: [
    {
      provide: RegisterUsecase,
      useFactory: (repo: UserRepositoryInterface) => {
        return new RegisterUsecase(repo);
      },
      deps: [UserRepositoryInterface],
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
export class RegisterModule { }
