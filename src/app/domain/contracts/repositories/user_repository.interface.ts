import { LoginEntity } from '@domain/entities/auth/login_entity';

export abstract class UserRepositoryInterface {
  abstract login(params: LoginParams): Promise<LoginEntity>;
}

export interface LoginParams {
  email: string;
  password: string;
}

