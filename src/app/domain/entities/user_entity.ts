import { BaseEntity } from './../shared/base_entity';
import { BaseEntityProps } from "../shared/base_entity";

export interface UserEntityProps extends BaseEntityProps {
  email: string;
  name: string;
  phone: string;
  birthDate: Date;
}

export class UserEntity extends BaseEntity {

  constructor(props: UserEntityProps) {
    super(props);

    this.email = props.email;
    this.name = props.name;
    this.phone = props.phone;
    this.birthDate = props.birthDate;
  }

  private props!: UserEntityProps;

  public set email(email: string) {
    this.props.email = email;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public set phone(phone: string) {
    this.props.phone = phone;
  }

  public set birthDate(birthDate: Date) {
    this.props.birthDate = birthDate;
  }

  public get email(): string {
    return this.props.email;
  }

  public get name(): string {
    return this.props.name;
  }

  public get phone(): string {
    return this.props.phone;
  }

  public get birthDate(): Date {
    return this.props.birthDate;
  }
}
