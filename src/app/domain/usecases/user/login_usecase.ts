import { UserEntity } from './../../entities/user/user_entity';
import { UserRepositoryInterface } from './../../contracts/repositories/user_repository.interface';
import { LoginPayload } from '../../contracts/payloads/user/login_payload';
import { UseCase } from '../../shared/usecase';

export class LoginUsecase implements UseCase<LoginPayload, UserEntity> {
  constructor(
    private readonly repository: UserRepositoryInterface,
  ) {}

  async call(params: LoginPayload): Promise<UserEntity> {
    return await this.repository.login(params);
  }
}
