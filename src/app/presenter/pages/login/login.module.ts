import { UserDatasource } from './../../../infrastructure/datasources/user/user_datasource';
import { UserDatasourceInterface } from './../../../infrastructure/contracts/datasources/user_datasource.interface';
import { UserRepositoryInterface } from 'src/app/domain/contracts/repositories/user_repository.interface';
import { LoginUsecase } from './../../../domain/usecases/user/login_usecase';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { UserRepository } from 'src/app/infrastructure/repositories/user/user_repository';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpService } from 'src/app/infrastructure/modules/http/services/http_service';
import { StorageService } from 'src/app/infrastructure/modules/storage/services/storage.service';
import { StorageServiceInterface } from 'src/app/infrastructure/modules/storage/models/storage-service-interface';
import { HttpServiceInterface } from 'src/app/infrastructure/modules/http/contracts/http_service.interface';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    {
      provide: LoginUsecase,
      useFactory: (repo: UserRepositoryInterface, storageService: StorageServiceInterface) => { 
        return new LoginUsecase(repo, storageService);
      },
      deps: [UserRepository, StorageService],
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
  ],
})
export class LoginModule { }
