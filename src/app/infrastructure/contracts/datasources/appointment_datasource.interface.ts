import { GetUserAppointmentsParams } from "@domain/contracts/repositories";
import { AppointmentEntity } from "@domain/entities/appointment/appointment_entity";
import { PaginatedItems } from "@domain/models/interfaces/paginated-items.interface";

export abstract class AppointmentDatasourceInterface {
  abstract getUserAppointments(params: GetUserAppointmentsParams): Promise<PaginatedItems<AppointmentEntity>>;
}
