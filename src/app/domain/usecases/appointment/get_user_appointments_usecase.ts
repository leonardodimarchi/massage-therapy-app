import { AppointmentRepositoryInterface } from '@domain/contracts/repositories';
import { AppointmentEntity } from '@domain/entities/appointment/appointment_entity';
import { PaginatedItems } from "@domain/models/interfaces/paginated-items.interface";
import { UseCase } from "@domain/usecases/usecase";

export type GetUserAppointmentsUsecaseInput = {
  page: number;
  limit: number;
};

export type GetUserAppointmentsUsecaseOutput = PaginatedItems<AppointmentEntity>;

export class GetUserAppointmentsUsecase implements UseCase<GetUserAppointmentsUsecaseInput, GetUserAppointmentsUsecaseOutput> {

  constructor(private readonly repository: AppointmentRepositoryInterface) { }

  async call({ page, limit }: GetUserAppointmentsUsecaseInput): Promise<GetUserAppointmentsUsecaseOutput> {
    return await this.repository.getUserAppointments({ page, limit });
  }
}
