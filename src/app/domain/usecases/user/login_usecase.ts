import { UserRepositoryInterface } from './../../contracts/repositories/user_repository.interface';
import { LoginPayload } from '../../contracts/payloads/user/login_payload';
import { UseCase } from '../../shared/usecase';

export class LoginUsecase implements UseCase<LoginPayload, void> {
  constructor(
    private readonly repository: UserRepositoryInterface,
  ) {}

  async call(params: LoginPayload): Promise<void> {
    await this.repository.login(params);
  }
}
