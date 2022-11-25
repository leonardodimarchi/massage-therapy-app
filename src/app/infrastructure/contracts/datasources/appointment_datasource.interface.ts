import { GetUserAppointmentsParams } from "@domain/contracts/repositories";
import { AppointmentEntity } from "@domain/entities/appointment/appointment_entity";
import { PaginatedItemsEntity } from "@domain/entities/shared/paginated_items_entity";

export abstract class AppointmentDatasourceInterface {
  abstract getUserAppointments(params: GetUserAppointmentsParams): Promise<PaginatedItemsEntity<AppointmentEntity>>;
}
