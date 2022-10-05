import { LoginPayload } from "src/app/domain/contracts/payloads/user/login_payload";
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
            const params: LoginPayload = {
                email: 'mocked@email.com',
                password: '123456',
            };

            await datasource.login(params);

            expect(httpService.post).toHaveBeenCalledOnceWith('/login', params);
        });
    });
});