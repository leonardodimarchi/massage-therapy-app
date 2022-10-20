import { JwtEntity } from "src/app/domain/entities/auth/jwt_entity";
import { Mapper } from "../../shared/mappers/mapper";
import { JwtDto } from "../dto/jwt_dto";

export class JwtMapper extends Mapper<JwtEntity> {
    private props: JwtDto;

    constructor(props: JwtDto) {
        super();

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