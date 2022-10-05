import { UserEntity } from "src/app/domain/entities/user/user_entity";
import { BaseModelProps, Model } from "../model";

export interface UserModelProps extends BaseModelProps {
    email: string;
    name: string;
    phone: string;
    birthDate: string;
}

export class UserModel extends Model<UserEntity> {
    private props: UserModelProps;

    constructor(props: UserModelProps) {
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