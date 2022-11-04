import { BaseEntityProps } from "@domain/entities/base_entity";

export interface UserEntityProps extends BaseEntityProps {
  email: string;
  name: string;
  phone: string;
  birthDate: Date;
}

export class UserEntity {

  constructor(props: UserEntityProps) {
    this.props = props;
  }

  private props: UserEntityProps;

  public set id(id: number) {
    this.props.id = id;
  }

  public set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  public set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }

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

  public get id(): number {
    return this.props.id;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
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
