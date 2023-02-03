import { LoginEntity } from '@domain/entities/auth/login_entity';
import { UserEntity } from '@domain/entities/user/user_entity';
import { UserGenderEnum } from '@domain/models/user/user_gender.enum';

export abstract class UserRepositoryInterface {
  abstract login(params: LoginParams): Promise<LoginEntity>;
  abstract register(params: RegisterParams): Promise<UserEntity>;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  email: string;
  name: string;
  phone: string;
  birthDate: Date;
  password: string;
  gender: UserGenderEnum;
  diseaseHistory?: string;

  state: string;
  city: string;
  postalCode: string;
  neighborhood: string;
  houseNumber: number;
}

