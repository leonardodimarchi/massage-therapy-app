import { UserServiceInterface } from "@domain/contracts/services/user_service.interface";
import { UseCase } from "@domain/usecases/usecase";

export type LogoutUsecaseInput = void
export type LogoutUsecaseOutput = Promise<void>;

export class LogoutUsecase implements UseCase<LogoutUsecaseInput, LogoutUsecaseOutput> {
  constructor(
    private readonly userService: UserServiceInterface,
  ) { }

  async call(): Promise<LogoutUsecaseOutput> {
    return await this.userService.clearLoggedUser();
  }
}
