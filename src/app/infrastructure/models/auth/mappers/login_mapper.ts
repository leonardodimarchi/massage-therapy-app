import { LoginEntity } from "src/app/domain/entities/auth/login_entity";
import { Mapper } from "../../shared/mappers/mapper";
import { UserMapper } from "../../user/mappers/user_mapper";
import { LoginDto } from "../dto/login_dto";
import { JwtMapper } from "./jwt_mapper";

export class LoginMapper extends Mapper<LoginEntity> {
    private props: LoginDto;

    constructor(props: LoginDto) {
        super();

        this.props = props;
    }

    toEntity(): LoginEntity {
        const {
            jwt,
            user: loggedUser,
        } = this.props;

        return new LoginEntity({
            jwt: new JwtMapper(jwt).toEntity(),
            loggedUser: new UserMapper(loggedUser).toEntity(),
        })
    }
}