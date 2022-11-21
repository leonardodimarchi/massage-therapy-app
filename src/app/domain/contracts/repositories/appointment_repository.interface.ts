import { AppointmentEntity } from './../../entities/appointment/appointment_entity';
import { PaginatedItems } from './../../models/interfaces/paginated-items.interface';

export abstract class AppointmentRepositoryInterface {
  abstract getUserAppointments(params: GetUserAppointmentsParams): Promise<PaginatedItems<AppointmentEntity>>;
}

export interface GetUserAppointmentsParams {
  page: number;
  limit: number;
}



