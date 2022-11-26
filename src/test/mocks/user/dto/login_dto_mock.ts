import { LoginDto } from "@infra/models/auth/dto/login_dto";

const id = 1;
const createdAt = new Date(2022, 9, 5).toISOString();
const updatedAt = new Date(2022, 9, 6).toISOString();
const birthDate = new Date(2000, 10, 11).toISOString();
const email = 'myemail@email.com';
const name = 'My name';
const phone = '5515991849367';

export const mockedLoginDto: LoginDto = {
  jwt: {
    access_token: 'mocked',
  },
  user: {
    id,
    createdAt,
    updatedAt,
    birthDate,
    email,
    name,
    phone,
  }
}
