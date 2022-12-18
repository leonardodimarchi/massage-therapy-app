import { UserEntity } from './../../../domain/entities/user/user_entity';
import { JwtEntity } from './../../../domain/entities/auth/jwt_entity';
import { LoginDto } from './../../models/auth/dto/login_dto';
import { LoginParams } from "@domain/contracts/repositories";
import { UserDatasourceInterface } from "@infra/contracts/datasources";
import { UserRepository } from "@infra/repositories/user/user_repository";
import { HttpErrorHandler } from "../shared/errors/http_error_handler";
import { mockedLoginDto } from '@mocks/user/dto/login_dto_mock';

describe('UserRepository', () => {
  let datasource: jasmine.SpyObj<UserDatasourceInterface>;
  let repository: UserRepository;

  beforeEach(() => {
    datasource = jasmine.createSpyObj('UserDatasourceInterface', ['login']);
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
});
