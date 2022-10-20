import { UserDto } from "../../user/dto/user_dto";
import { JwtDto } from "./jwt_dto";

export interface LoginDto {
    jwt: JwtDto;
    user: UserDto;
}
