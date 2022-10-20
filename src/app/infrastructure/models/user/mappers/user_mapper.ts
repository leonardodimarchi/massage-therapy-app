import { UserEntity } from "src/app/domain/entities/user/user_entity";
import { Mapper } from "../../shared/mappers/mapper";
import { UserDto } from "../dto/user_dto";

export class UserMapper extends Mapper<UserEntity> {
    private props: UserDto;

    constructor(props: UserDto) {
        super();

        this.props = props;
    }

    toEntity(): UserEntity {
        const {
            id,
            createdAt,
            updatedAt,
            birthDate,
            email,
            name,
            phone,
        } = this.props;

        return new UserEntity({
            id,
            createdAt: new Date(createdAt),
            updatedAt: new Date(updatedAt),
            birthDate: new Date(birthDate),
            email,
            name,
            phone,
        })
    }
}