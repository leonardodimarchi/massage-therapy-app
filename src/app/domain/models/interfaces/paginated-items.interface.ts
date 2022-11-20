export interface PaginatedItems<TEntity> {
  page: number;
  count: number;
  pageCount: number;
  total: number;
  items: TEntity[];
}
