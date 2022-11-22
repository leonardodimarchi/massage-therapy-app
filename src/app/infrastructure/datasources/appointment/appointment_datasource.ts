import { GetUserAppointmentsParams } from '@domain/contracts/repositories';
import { AppointmentEntity } from '@domain/entities/appointment/appointment_entity';
import { PaginatedItems } from '@domain/models/interfaces/paginated-items.interface';
import { AppointmentDatasourceInterface } from '@infra/contracts/datasources';

export class AppointmentDatasource implements AppointmentDatasourceInterface {
  getUserAppointments(params: GetUserAppointmentsParams): Promise<PaginatedItems<AppointmentEntity>> {
    throw new Error('Method not implemented.');
  }
}
