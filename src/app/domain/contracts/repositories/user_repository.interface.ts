import { LoginEntity } from '../../entities/auth/login_entity';

export interface UserRepositoryInterface {
  login(params: LoginParams): Promise<LoginEntity>;
}

export interface LoginParams {
  email: string;
  password: string;
}

