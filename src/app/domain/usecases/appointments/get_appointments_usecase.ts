import { UseCase } from "@domain/usecases/usecase";

export type GetAppointmentsUsecaseInput = void;
export type GetAppointmentsUsecaseOutput = void;

export class GetAppointmentsUsecase implements UseCase<GetAppointmentsUsecaseInput, GetAppointmentsUsecaseOutput> {

  constructor() { }

  async call(params: GetAppointmentsUsecaseInput): Promise<GetAppointmentsUsecaseOutput> {

  }
}
