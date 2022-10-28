import { JwtEntity } from "@domain/entities/auth/jwt_entity";

export const mockedJwtEntity: JwtEntity = new JwtEntity({
  accessToken: 'token',
})
