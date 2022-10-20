export interface BaseEntityProps {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export class BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: BaseEntityProps) {
    this.id = props.id;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
