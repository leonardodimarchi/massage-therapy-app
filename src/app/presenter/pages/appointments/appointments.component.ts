import { AppointmentEntity } from './../../../domain/entities/appointment/appointment_entity';
import { GetUserAppointmentsUsecase } from './../../../domain/usecases/appointment/get_user_appointments_usecase';
import { Component } from "@angular/core";
import { PaginatedItemsEntity } from '@domain/entities/shared/paginated_items_entity';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent {

  constructor(
    private readonly getUserAppointmentsUsecase: GetUserAppointmentsUsecase,
  ) { }

  public appointments: PaginatedItemsEntity<AppointmentEntity> = new PaginatedItemsEntity({
    page: 0,
    pageCount: 1,
    total: 0,
    count: 0,
    items: [],
  });

  public itemsPerPage: number = 8;

  public isLoading: boolean = false;

  public async loadAppointments(): Promise<void> {
    if (this.appointments.page === this.appointments.pageCount)
      return;

    this.isLoading = true;

    try {
      this.appointments = await this.getUserAppointmentsUsecase.call({
        limit: this.itemsPerPage,
        page: this.appointments.page + 1,
      });
    } catch (e) {
      
    } finally {
      this.isLoading = false;
    }
  }
}
