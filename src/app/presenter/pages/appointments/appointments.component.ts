import { PaginatedItemsEntity } from './../../../domain/entities/shared/paginated_items_entity';
import { AppointmentEntity } from './../../../domain/entities/appointment/appointment_entity';
import { GetUserAppointmentsUsecase } from './../../../domain/usecases/appointment/get_user_appointments_usecase';
import { Component } from "@angular/core";

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent {

  constructor(
    private readonly getUserAppointmentsUsecase: GetUserAppointmentsUsecase,
  ) { }
}
