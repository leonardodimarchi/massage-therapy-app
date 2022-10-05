import { LoginPayload } from "src/app/domain/contracts/payloads/user/login_payload";
import { mockedUserModelProps } from "src/app/mocks/user/user_model_mock";
import { HttpServiceInterface } from "../../contracts/services/http/http_service.interface";
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
            httpService.post.and.resolveTo(mockedUserModelProps);
            
            const params: LoginPayload = {
                email: 'mocked@email.com',
                password: '123456',
            };

            await datasource.login(params);

            expect(httpService.post).toHaveBeenCalledOnceWith('/login', params);
        });
    });
});