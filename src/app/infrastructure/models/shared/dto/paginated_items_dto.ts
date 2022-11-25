import { BaseEntityDto } from '@infra/models/shared/dto/base_entity_dto';

export interface PaginatedItemsDto<ItemDto extends BaseEntityDto> {
  page: number;
  count: number;
  pageCount: number;
  total: number;
  items: ItemDto[];
}
