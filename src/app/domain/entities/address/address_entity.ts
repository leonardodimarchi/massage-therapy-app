export interface AddressEntityProps {
  postalCode: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
}

export class AddressEntity {

  constructor(props: AddressEntityProps) {
    this.props = props;
  }

  private props: AddressEntityProps;

  public set postalCode(postalCode: string) {
    this.props.postalCode = postalCode;
  }

  public get postalCode(): string {
    return this.props.postalCode;
  }

  public set state(state: string) {
    this.props.state = state;
  }

  public get state(): string {
    return this.props.state;
  }

  public set city(city: string) {
    this.props.city = city;
  }

  public get city(): string {
    return this.props.city;
  }

  public set neighborhood(neighborhood: string) {
    this.props.neighborhood = neighborhood;
  }

  public get neighborhood(): string {
    return this.props.neighborhood;
  }

  public set street(street: string) {
    this.props.street = street;
  }

  public get street(): string {
    return this.props.street;
  }
}
