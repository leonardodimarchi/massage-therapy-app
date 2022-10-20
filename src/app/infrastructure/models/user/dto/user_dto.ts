import { BaseEntityDto } from "../../shared/dto/base_entity_dto";

export interface UserDto extends BaseEntityDto {
    email: string;
    name: string;
    phone: string;
    birthDate: string;
}