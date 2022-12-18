export interface BaseEntityProps {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export abstract class BaseEntity<TProps extends BaseEntityProps> {

  constructor(props: TProps) {
    this.props = props;
  }

  protected props: TProps;

  public set id(id: number) {
    this.props.id = id;
  }

  public set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  public set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
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
}

