import { AppointmentMapper } from '@infra/models/appointment/mappers/appointment_mapper';
import { AppointmentDto } from '@infra/models/appointment/dto/appointment_dto';
import { PaginatedItemsEntity } from '@domain/entities/shared/paginated_items_entity';
import { HttpErrorHandler } from './../shared/errors/http_error_handler';
import { AppointmentRepositoryInterface, GetUserAppointmentsParams } from "@domain/contracts/repositories/appointment_repository.interface";
import { AppointmentEntity } from "@domain/entities/appointment/appointment_entity";
import { AppointmentDatasourceInterface } from "@infra/contracts/datasources";
import { PaginatedItemsMapper } from '@infra/models/shared/mappers/paginated_items_mapper';

export class AppointmentRepository implements AppointmentRepositoryInterface {

  constructor(
    private readonly datasource: AppointmentDatasourceInterface
  ) {}

  async getUserAppointments(params: GetUserAppointmentsParams): Promise<PaginatedItemsEntity<AppointmentEntity>> {
    try {
      const result = await this.datasource.getUserAppointments(params);

      const mapper = new PaginatedItemsMapper<AppointmentDto, AppointmentEntity>(result, AppointmentMapper);
      return mapper.toEntity();
    } catch (error: unknown) {
      HttpErrorHandler.handle(error);
    }
  }
}
