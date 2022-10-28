import { LoginParams } from "@domain/contracts/repositories";
import { HttpServiceInterface } from "@domain/contracts/services";
import { LoginDto } from "@infra/models/auth/dto/login_dto";
import { ApiEndpoints } from "@infra/datasources/endpoints";
import { UserDatasource } from "@infra/datasources/user/user_datasource";
import { mockedUserModelProps } from "@mocks/user/dto/user_dto_mock";

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
                    ...mockedUserModelProps,
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
    });
});
