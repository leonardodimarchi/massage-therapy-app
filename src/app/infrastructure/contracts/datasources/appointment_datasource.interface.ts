import { AppointmentDto } from '@infra/models/appointment/dto/appointment_dto';
import { GetUserAppointmentsParams } from "@domain/contracts/repositories";
import { PaginatedItemsDto } from "@infra/models/shared/dto/paginated_items_dto";

export abstract class AppointmentDatasourceInterface {
  abstract getUserAppointments(params: GetUserAppointmentsParams): Promise<PaginatedItemsDto<AppointmentDto>>;
}
