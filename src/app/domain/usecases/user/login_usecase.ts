import { UserRepositoryInterface } from "@domain/contracts/repositories/user_repository.interface";
import { UserServiceInterface } from "@domain/contracts/services/user_service.interface";
import { UserValidators } from "@domain/validators/user/user_validators";
import { UseCase } from "@domain/usecases/usecase";
import { ValidationError } from "@domain/errors/validation_error";

export interface LoginUsecaseInput {
  email: string;
  password: string;
};

export type LoginUsecaseOutput = void;

export class LoginUsecase implements UseCase<LoginUsecaseInput, LoginUsecaseOutput> {
  constructor(
    private readonly repository: UserRepositoryInterface,
    private readonly userService: UserServiceInterface,
  ) { }

  async call(params: LoginUsecaseInput): Promise<LoginUsecaseOutput> {
    const isValidEmail = UserValidators.isValidEmail(params.email);
    const isValidPassword = UserValidators.isValidPassword(params.password);

    if (!isValidEmail)
      throw new ValidationError('Por favor, enviar um e-mail válido.');

    if (!isValidPassword)
      throw new ValidationError('Por favor, enviar uma senha válida.');

    params.email = params.email.trim();
    params.password = params.password.trim();

    const { jwt, loggedUser } = await this.repository.login(params);

    await this.userService.setJwt(jwt);
    await this.userService.setLoggedUser(loggedUser);
  }
}
