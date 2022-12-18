export interface PaginatedItemsEntityProps<TEntity> {
  page: number;
  count: number;
  pageCount: number;
  total: number;
  items: TEntity[];
}

export class PaginatedItemsEntity<TEntity> {

  constructor(props: PaginatedItemsEntityProps<TEntity>) {
    this.props = props;
  }

  protected props: PaginatedItemsEntityProps<TEntity>;

  public set page(page: number) {
    this.props.page = page;
  }

  public set count(count: number) {
    this.props.count = count;
  }

  public set pageCount(pageCount: number) {
    this.props.pageCount = pageCount;
  }

  public set total(total: number) {
    this.props.total = total;
  }

  public set items(items: TEntity[]) {
    this.props.items = items;
  }

  public get page(): number {
    return this.props.page;
  }

  public get count(): number {
    return this.props.count;
  }

  public get pageCount(): number {
    return this.props.pageCount;
  }

  public get total(): number {
    return this.props.total;
  }

  public get items(): TEntity[] {
    return this.props.items;
  }
}


