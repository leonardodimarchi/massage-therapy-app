import { LoginPayload } from "src/app/domain/contracts/payloads/user/login_payload";
import { UserEntity } from "src/app/domain/entities/user/user_entity";
import { UserDatasourceInterface } from "../../contracts/datasources/user_datasource.interface";
import { HttpClient } from "@angular/common/http";
import { HttpServiceInterface } from "../../contracts/services/http/http_service.interface";

export class UserDatasource implements UserDatasourceInterface {

    constructor(
        private readonly httpService: HttpServiceInterface,
    ) {}

    async login(params: LoginPayload): Promise<UserEntity> {
        return await this.httpService.post('/login', params);
    } 
}