import { UserRepositoryInterface } from './../../contracts/repositories/user_repository.interface';
import { LoginPayload } from '../../contracts/payloads/user/login_payload';
import { UseCase } from '../../shared/usecase';
import { StorageServiceInterface } from 'src/app/infrastructure/modules/storage/models/storage-service-interface';
import { storageKeys } from 'src/environments/storage_keys';
import { UserValidators } from '../../validators/user/user_validators';

export type LoginUsecaseInput = LoginPayload;
export type LoginUsecaseOutput = void;

export class LoginUsecase implements UseCase<LoginPayload, LoginUsecaseOutput> {
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

    const jwt = await this.repository.login(params);

    await this.storageService.set(storageKeys.userToken, jwt.access_token);
  }
}
