import { UserEntity } from '../../../domain/entities/user/user_entity';

const id = 1;
const createdAt = new Date(2022, 9, 5);
const updatedAt = new Date(2022, 9, 6);
const birthDate = new Date(2000, 10, 11);
const email = 'myemail@email.com';
const name = 'My name';
const phone = '5515991849367';

export const mockedUserEntity: UserEntity = new UserEntity({
  id,
  createdAt,
  updatedAt,
  birthDate,
  email,
  name,
  phone,
});
