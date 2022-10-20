import { LoginParams } from "src/app/domain/contracts/repositories/user_repository.interface";
import { mockedUserModelProps } from "src/app/mocks/user/dto/user_dto_mock";
import { HttpServiceInterface } from "../../modules/http/contracts/http_service.interface";
import { LoginDto } from "../../models/auth/dto/login_dto";
import { ApiEndpoints } from "../endpoints";
import { UserDatasource } from "./user_datasource";

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