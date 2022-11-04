import { UserEntity } from "@domain/entities/user/user_entity";

describe('UserEntity', () => {
  it('should create with correct properties', () => {
    const id = 1;
    const createdAt = new Date(2022, 9, 5);
    const updatedAt = new Date(2022, 9, 6);
    const birthDate = new Date(2000, 10, 11);
    const email = 'myemail@email.com';
    const name = 'My name';
    const phone = '5515991849367';

    const user = new UserEntity({
      id,
      createdAt,
      updatedAt,
      birthDate,
      email,
      name,
      phone,
    });

    expect(user.id).toBe(id);
    expect(user.createdAt).toBe(createdAt);
    expect(user.updatedAt).toBe(updatedAt);
    expect(user.birthDate).toBe(birthDate);
    expect(user.email).toBe(email);
    expect(user.name).toBe(name);
    expect(user.phone).toBe(phone);
  });
});
