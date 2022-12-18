import { BaseEntity } from '@domain/entities/shared/base_entity';
import { PaginatedItemsEntity } from '@domain/entities/shared/paginated_items_entity';
import { BaseEntityDto } from '@infra/models/shared/dto/base_entity_dto';
import { Mapper } from "@infra/models/shared/mappers/mapper";
import { PaginatedItemsDto } from '../dto/paginated_items_dto';

type MapperClass<ItemDto, TEntity> = { new(item: ItemDto): Mapper<TEntity> };

export class PaginatedItemsMapper<ItemDto extends BaseEntityDto, TEntity extends BaseEntity<any>> implements Mapper<PaginatedItemsEntity<TEntity>> {
    private props: PaginatedItemsDto<ItemDto>;
    private mapper: MapperClass<ItemDto, TEntity>;

    constructor(props: PaginatedItemsDto<ItemDto>, mapper: MapperClass<ItemDto, TEntity>) {
      this.props = props;
      this.mapper = mapper;
    }

    toEntity(): PaginatedItemsEntity<TEntity> {
      const {
        count,
        page,
        pageCount,
        total,
        items,
      } = this.props;

      return new PaginatedItemsEntity<TEntity>({
        count,
        page,
        pageCount,
        total,
        items: items.map(i => new this.mapper(i).toEntity()),
      });
    }
}
