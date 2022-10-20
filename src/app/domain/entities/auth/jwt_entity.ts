export interface JwtEntityProps {
    accessToken: string;
}

export class JwtEntity {
  
  constructor(props: JwtEntityProps) {
    this.props = props;

    this.accessToken = props.accessToken;
  }

  private props: JwtEntityProps;

  public set accessToken(token: string) {
    this.props.accessToken = token;
  }

  public get accessToken(): string {
    return this.props.accessToken;
  }
}
