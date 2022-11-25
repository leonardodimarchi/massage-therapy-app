import { LoginEntity } from "@domain/entities/auth/login_entity";
import { Mapper } from "@infra/models/shared/mappers/mapper";
import { UserMapper } from "@infra/models/user/mappers/user_mapper";
import { LoginDto } from "@infra/models/auth/dto/login_dto";
import { JwtMapper } from "@infra/models/auth/mappers/jwt_mapper";

export class LoginMapper implements Mapper<LoginEntity> {
    private props: LoginDto;

    constructor(props: LoginDto) {
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
