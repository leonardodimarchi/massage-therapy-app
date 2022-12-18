import { AppointmentRepositoryInterface } from '@domain/contracts/repositories';
import { AppointmentEntity } from '@domain/entities/appointment/appointment_entity';
import { PaginatedItemsEntity } from '@domain/entities/shared/paginated_items_entity';
import { UseCase } from "@domain/usecases/usecase";

export type GetUserAppointmentsUsecaseInput = {
  page: number;
  limit: number;
};

export type GetUserAppointmentsUsecaseOutput = PaginatedItemsEntity<AppointmentEntity>;

export class GetUserAppointmentsUsecase implements UseCase<GetUserAppointmentsUsecaseInput, GetUserAppointmentsUsecaseOutput> {

  constructor(private readonly repository: AppointmentRepositoryInterface) { }

  async call({ page, limit }: GetUserAppointmentsUsecaseInput): Promise<GetUserAppointmentsUsecaseOutput> {
    return await this.repository.getUserAppointments({ page, limit });
  }
}
