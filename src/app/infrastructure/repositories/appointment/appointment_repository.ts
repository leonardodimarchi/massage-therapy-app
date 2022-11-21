import { HttpErrorHandler } from './../shared/errors/http_error_handler';
import { AppointmentRepositoryInterface, GetUserAppointmentsParams } from "@domain/contracts/repositories/appointment_repository.interface";
import { AppointmentEntity } from "@domain/entities/appointment/appointment_entity";
import { PaginatedItems } from "@domain/models/interfaces/paginated-items.interface";
import { AppointmentDatasourceInterface } from "@infra/contracts/datasources";

export class AppointmentRepository implements AppointmentRepositoryInterface {

  constructor(
    private readonly datasource: AppointmentDatasourceInterface
  ) {}

  async getUserAppointments(params: GetUserAppointmentsParams): Promise<PaginatedItems<AppointmentEntity>> {
    try {
      return await this.datasource.getUserAppointments(params);
    } catch (error: unknown) {
      HttpErrorHandler.handle(error);
    }
  }
}
