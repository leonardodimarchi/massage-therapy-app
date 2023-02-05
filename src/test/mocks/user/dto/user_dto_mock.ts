import { UserDto } from "@infra/models/user/dto/user_dto";

const id = 1;
const createdAt = new Date(2022, 9, 5);
const updatedAt = new Date(2022, 9, 6);
const birthDate = new Date(2000, 10, 11);
const email = 'myemail@email.com';
const name = 'My name';
const phone = '5515991849367';

export const mockedUserDto: UserDto = {
    id,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    birthDate: birthDate.toISOString(),
    email,
    name,
    phone,
}
