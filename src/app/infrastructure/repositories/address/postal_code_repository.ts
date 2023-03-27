import { AddressByPostalCodeMapper } from './../../models/address/mappers/address_by_postal_code_mapper';
import { HttpErrorHandler } from '@infra/repositories/shared/errors/http_error_handler';
import { AddressEntity } from '@domain/entities/address/address_entity';
import { PostalCodeRepositoryInterface } from "@domain/contracts/repositories";
import { PostalCodeDatasourceInterface } from '@infra/contracts/datasources';

export class PostalCodeRepository implements PostalCodeRepositoryInterface {

  constructor(
    private readonly datasource: PostalCodeDatasourceInterface,
  ) {}

  async getAddressByPostalCode(postalCode: string): Promise<AddressEntity> {
    try {
      const result = await this.datasource.getAddressByPostalCode(postalCode);

      const mapper = new AddressByPostalCodeMapper(result);

      return mapper.toEntity();
    } catch(error) {
      HttpErrorHandler.handle(error);
    }
  }
}
