import { UserEntity } from "../user/user_entity";
import { JwtEntity } from "./jwt_entity";

export interface LoginEntityProps {
    jwt: JwtEntity;
    loggedUser: UserEntity,
}

export class LoginEntity {
  
  constructor(props: LoginEntityProps) {
    this.props = props;

    this.jwt = props.jwt;
    this.loggedUser = props.loggedUser;
  }

  private props: LoginEntityProps;

  public set jwt(jwt: JwtEntity) {
    this.props.jwt = jwt;
  }

  public get jwt(): JwtEntity {
    return this.props.jwt;
  }

  public set loggedUser(user: UserEntity) {
    this.props.loggedUser = user;
  }

  public get loggedUser(): UserEntity {
    return this.props.loggedUser;
  }
}
