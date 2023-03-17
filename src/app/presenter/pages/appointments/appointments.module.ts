import { InfiniteScrollModule } from './../../components/infinite-scroll/infinite-scroll.module';
import { AppointmentCardModule } from './../../components/appointment-card/appointment-card.module';
import { HttpService } from './../../../infrastructure/modules/http/services/http_service';
import { AppointmentDatasource } from './../../../infrastructure/datasources/appointment/appointment_datasource';
import { GetUserAppointmentsUsecase } from './../../../domain/usecases/appointment/get_user_appointments_usecase';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from "./appointments.component";
import { AppointmentRepositoryInterface } from '@domain/contracts/repositories';
import { AppointmentDatasourceInterface } from '@infra/contracts/datasources';
import { AppointmentRepository } from '@infra/repositories/appointment/appointment_repository';
import { HttpServiceInterface } from '@domain/contracts/services/http_service.interface';
import { LoadingSpinnerModule } from '@infra/modules/loading/loading.module';
import { HeaderModule } from '@presenter/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    AppointmentCardModule,
    InfiniteScrollModule,
    LoadingSpinnerModule,
    HeaderModule,
  ],
  declarations: [
    AppointmentsComponent,
  ],
  providers: [
    {
      provide: GetUserAppointmentsUsecase,
      useFactory: (repository: AppointmentRepositoryInterface) => {
        return new GetUserAppointmentsUsecase(repository);
      },
      deps: [AppointmentRepositoryInterface],
    },
    {
      provide: AppointmentRepositoryInterface,
      useFactory: (datasource: AppointmentDatasourceInterface) => {
        return new AppointmentRepository(datasource);
      },
      deps: [AppointmentDatasourceInterface],
    },
    {
      provide: AppointmentDatasourceInterface,
      useFactory: (httpService: HttpServiceInterface) => {
        return new AppointmentDatasource(httpService);
      },
      deps: [HttpService],
    },
  ],
})
export class AppointmentsModule { }
