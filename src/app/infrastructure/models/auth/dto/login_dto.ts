import { UserDto } from "@infra/models/user/dto/user_dto";
import { JwtDto } from "@infra/models/auth/dto/jwt_dto";

export interface LoginDto {
    jwt: JwtDto;
    user: UserDto;
}
