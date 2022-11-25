import { AppointmentDto } from './../../models/appointment/dto/appointment_dto';
import { PaginatedItemsEntity } from '@domain/entities/shared/paginated_items_entity';
import { ApiEndpoints } from './../endpoints';
import { GetUserAppointmentsParams } from '@domain/contracts/repositories';
import { HttpServiceInterface } from '@domain/contracts/services';
import { AppointmentEntity } from '@domain/entities/appointment/appointment_entity';
import { AppointmentDatasourceInterface } from '@infra/contracts/datasources';
import { PaginatedItemsMapper } from '@infra/models/shared/mappers/paginated_items_mapper';
import { AppointmentMapper } from '@infra/models/appointment/mappers/appointment_mapper';
import { PaginatedItemsDto } from '@infra/models/shared/dto/paginated_items_dto';

export class AppointmentDatasource implements AppointmentDatasourceInterface {

  constructor(
    private readonly httpService: HttpServiceInterface,
  ) { }

  async getUserAppointments({ page, limit }: GetUserAppointmentsParams): Promise<PaginatedItemsEntity<AppointmentEntity>> {
    const url = ApiEndpoints.Appointment.getUserAppointments(page, limit);

    const result = await this.httpService.get<PaginatedItemsDto<AppointmentDto>>(url);

    return new PaginatedItemsMapper<AppointmentDto, AppointmentEntity>(result, AppointmentMapper).toEntity();
  }
}
