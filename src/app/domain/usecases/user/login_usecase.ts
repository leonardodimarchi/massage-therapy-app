import { UserRepositoryInterface } from './../../contracts/repositories/user_repository.interface';
import { UseCase } from '../usecase';
import { StorageServiceInterface } from 'src/app/domain/contracts/services/storage_service.interface';
import { storageKeys } from 'src/environments/storage_keys';
import { UserValidators } from '../../validators/user/user_validators';

export interface LoginUsecaseInput {
  email: string;
  password: string;
};

export type LoginUsecaseOutput = void;

export class LoginUsecase implements UseCase<LoginUsecaseInput, LoginUsecaseOutput> {
  constructor(
    private readonly repository: UserRepositoryInterface,
    private readonly storageService: StorageServiceInterface,
  ) { }

  async call(params: LoginUsecaseInput): Promise<LoginUsecaseOutput> {
    const isValidEmail = UserValidators.isValidEmail(params.email);
    const isValidPassword = UserValidators.isValidPassword(params.password);

    if (!isValidEmail)
      throw new Error('Por favor, enviar um e-mail válido.');

    if (!isValidPassword)
      throw new Error('Por favor, enviar uma senha válida.');

    const { jwt, loggedUser } = await this.repository.login(params);

    await this.storageService.set(storageKeys.userToken, jwt.accessToken);
    await this.storageService.set(storageKeys.loggedUser, loggedUser);
  }
}
