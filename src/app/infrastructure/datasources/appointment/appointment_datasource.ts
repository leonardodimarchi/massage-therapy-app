import { AppointmentDto } from './../../models/appointment/dto/appointment_dto';
import { ApiEndpoints } from './../endpoints';
import { GetUserAppointmentsParams } from '@domain/contracts/repositories';
import { HttpServiceInterface } from '@domain/contracts/services';
import { AppointmentDatasourceInterface } from '@infra/contracts/datasources';
import { PaginatedItemsDto } from '@infra/models/shared/dto/paginated_items_dto';

export class AppointmentDatasource implements AppointmentDatasourceInterface {

  constructor(
    private readonly httpService: HttpServiceInterface,
  ) { }

  async getUserAppointments({ page, limit }: GetUserAppointmentsParams): Promise<PaginatedItemsDto<AppointmentDto>> {
    const url = ApiEndpoints.Appointment.getUserAppointments(page, limit);

    return await this.httpService.get<PaginatedItemsDto<AppointmentDto>>(url);
  }
}
