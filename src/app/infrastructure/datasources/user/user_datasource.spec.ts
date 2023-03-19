import { LoginParams, RegisterParams } from "@domain/contracts/repositories";
import { HttpServiceInterface } from "@domain/contracts/services";
import { LoginDto } from "@infra/models/auth/dto/login_dto";
import { ApiEndpoints } from "@infra/datasources/endpoints";
import { UserDatasource } from "@infra/datasources/user/user_datasource";
import { mockedUserDto } from "@mocks/user/dto/user_dto_mock";
import { UserDto } from "@infra/models/user/dto/user_dto";
import { UserGenderEnum } from "@domain/models/user/user_gender.enum";

describe('UserDatasource', () => {
  let httpService: jasmine.SpyObj<HttpServiceInterface>;
  let datasource: UserDatasource;

  beforeEach(() => {
    httpService = jasmine.createSpyObj('HttpServiceInterface', ['post']);
    datasource = new UserDatasource(httpService);
  });

  describe('Login', () => {
    it('should call HTTP post with the correct url and payload', async () => {
      const returnValue: LoginDto = {
        jwt: {
          access_token: 'token',
        },
        user: {
          ...mockedUserDto,
        }
      }
      httpService.post.and.resolveTo(returnValue);

      const params: LoginParams = {
        email: 'mocked@email.com',
        password: '123456',
      };

      await datasource.login(params);

      expect(httpService.post).toHaveBeenCalledOnceWith(ApiEndpoints.Auth.login(), params);
    });

    it('should return the DTO', async () => {
      const returnValue: LoginDto = {
        jwt: {
          access_token: 'token',
        },
        user: {
          ...mockedUserDto,
        }
      }
      httpService.post.and.resolveTo(returnValue);

      const params: LoginParams = {
        email: 'mocked@email.com',
        password: '123456',
      };

      const result = await datasource.login(params);

      expect(result).toEqual(returnValue);
    });
  });

  describe('Register', () => {
    const successReturnValue: UserDto = {
      ...mockedUserDto,
    }

    const params: RegisterParams = {
      email: 'my.email@email.com',
      name: 'My name',
      phone: '15992485746',
      birthDate: new Date(),
      password: '123456',
      gender: UserGenderEnum.MALE,
      diseaseHistory: 'My history',
      address: {
        state: 'SP',
        city: 'Sorocaba',
        postalCode: '18273648',
        neighborhood: 'My neighborhood',
        houseNumber: 123,
      }
    };

    it('should call HTTP post with the correct url and payload', async () => {
      httpService.post.and.resolveTo(successReturnValue);

      await datasource.register(params);

      expect(httpService.post).toHaveBeenCalledOnceWith(ApiEndpoints.User.register(), params);
    });

    it('should return the DTO', async () => {
      httpService.post.and.resolveTo(successReturnValue);

      const result = await datasource.register(params);

      expect(result).toEqual(successReturnValue);
    });
  });
});
