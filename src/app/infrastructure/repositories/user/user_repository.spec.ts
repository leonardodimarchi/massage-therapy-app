import { UserEntity } from './../../../domain/entities/user/user_entity';
import { JwtEntity } from './../../../domain/entities/auth/jwt_entity';
import { LoginParams, RegisterParams } from "@domain/contracts/repositories";
import { UserDatasourceInterface } from "@infra/contracts/datasources";
import { UserRepository } from "@infra/repositories/user/user_repository";
import { HttpErrorHandler } from "../shared/errors/http_error_handler";
import { mockedLoginDto } from '@mocks/user/dto/login_dto_mock';
import { mockedUserDto } from '@mocks/user/dto/user_dto_mock';
import { UserGenderEnum } from '@domain/models/user/user_gender.enum';

describe('UserRepository', () => {
  let datasource: jasmine.SpyObj<UserDatasourceInterface>;
  let repository: UserRepository;

  beforeEach(() => {
    datasource = jasmine.createSpyObj('UserDatasourceInterface', ['login', 'register']);
    repository = new UserRepository(datasource);
  });

  describe('Login', () => {
    it('should call the datasource with the correct params', async () => {
      datasource.login.and.resolveTo(mockedLoginDto);

      const params: LoginParams = {
        email: 'mock@email.com',
        password: '123456',
      }

      await repository.login(params);

      expect(datasource.login).toHaveBeenCalledOnceWith(params);
    });

    it('should map the result and return the entities', async () => {
      datasource.login.and.resolveTo(mockedLoginDto);

      const result = await repository.login({
        email: 'mock@email.com',
        password: '123456',
      });

      expect(result.jwt).toBeInstanceOf(JwtEntity);
      expect(result.loggedUser).toBeInstanceOf(UserEntity);
    });

    it('should call the error handler', async () => {
      const error = new Error('mocked');
      const errorHandlerSpy = spyOn(HttpErrorHandler, 'handle');

      datasource.login.and.throwError(error);

      await repository.login({
        email: 'mock@email.com',
        password: '123456',
      });

      expect(errorHandlerSpy).toHaveBeenCalledOnceWith(error);
    });
  });

  describe('Register', () => {
    const params: RegisterParams = {
      email: 'my.email@email.com',
      name: 'My name',
      phone: '15992485746',
      birthDate: new Date(),
      password: '123456',
      gender: UserGenderEnum.MALE,
      diseaseHistory: 'My history',
      state: 'SP',
      city: 'Sorocaba',
      postalCode: '18273648',
      neighborhood: 'My neighborhood',
      houseNumber: 123,
    }

    it('should call the datasource with the correct params', async () => {
      datasource.register.and.resolveTo(mockedUserDto);

      await repository.register(params);

      expect(datasource.register).toHaveBeenCalledOnceWith(params);
    });

    it('should map the result and return the entities', async () => {
      datasource.register.and.resolveTo(mockedUserDto);

      const result = await repository.register(params);

      expect(result).toBeInstanceOf(UserEntity);
    });

    it('should call the error handler', async () => {
      const error = new Error('mocked');
      const errorHandlerSpy = spyOn(HttpErrorHandler, 'handle');

      datasource.register.and.throwError(error);

      await repository.register(params);

      expect(errorHandlerSpy).toHaveBeenCalledOnceWith(error);
    });
  });
});
