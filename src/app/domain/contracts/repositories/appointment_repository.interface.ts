import { PaginatedItemsEntity } from '@domain/entities/shared/paginated_items_entity';
import { AppointmentEntity } from './../../entities/appointment/appointment_entity';

export abstract class AppointmentRepositoryInterface {
  abstract getUserAppointments(params: GetUserAppointmentsParams): Promise<PaginatedItemsEntity<AppointmentEntity>>;
}

export interface GetUserAppointmentsParams {
  page: number;
  limit: number;
}



