import { JwtEntity } from "./jwt_entity";

describe('JwtEntity', () => {
  it('should create with correct properties', () => {
    const jwt = new JwtEntity({
      accessToken: 'token'
    });

    expect(jwt.accessToken).toBe('token');
  });
});
