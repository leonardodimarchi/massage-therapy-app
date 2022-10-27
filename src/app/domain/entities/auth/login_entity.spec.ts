import { mockedJwtEntity } from "@mocks/jwt/jwt_entity_mock";
import { mockedUserEntity } from "@mocks/user/entities/user_entity_mock";
import { LoginEntity } from "@domain/entities/auth/login_entity";


describe('LoginEntity', () => {
  const jwt = mockedJwtEntity;
  const loggedUser = mockedUserEntity;

  it('should create with correct properties', () => {
    const entity = new LoginEntity({
      jwt,
      loggedUser,
    });

    expect(entity.jwt).toEqual(jwt);
    expect(entity.loggedUser).toEqual(loggedUser);
  });
});
