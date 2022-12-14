import { JwtEntity } from "@domain/entities/auth/jwt_entity";
import { Mapper } from "@infra/models/shared/mappers/mapper";
import { JwtDto } from "@infra/models/auth/dto/jwt_dto";

export class JwtMapper implements Mapper<JwtEntity> {
    private props: JwtDto;

    constructor(props: JwtDto) {
        this.props = props;
    }

    toEntity(): JwtEntity {
        const {
            access_token
        } = this.props;

        return new JwtEntity({
            accessToken: access_token,
        })
    }
}
