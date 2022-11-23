import { ApiEndpoints } from './../endpoints';
import { GetUserAppointmentsParams } from '@domain/contracts/repositories';
import { HttpServiceInterface } from '@domain/contracts/services';
import { AppointmentEntity } from '@domain/entities/appointment/appointment_entity';
import { PaginatedItems } from '@domain/models/interfaces/paginated-items.interface';
import { AppointmentDatasourceInterface } from '@infra/contracts/datasources';

export class AppointmentDatasource implements AppointmentDatasourceInterface {

  constructor(
    private readonly httpService: HttpServiceInterface,
  ) { }

  async getUserAppointments({ page, limit }: GetUserAppointmentsParams): Promise<PaginatedItems<AppointmentEntity>> {
    const url = ApiEndpoints.Appointment.getUserAppointments(page, limit);

    await this.httpService.get(url);

    return {
      count: 1,
      items: [],
      page: 1,
      pageCount: 1,
      total: 1,
    };
  }
}
