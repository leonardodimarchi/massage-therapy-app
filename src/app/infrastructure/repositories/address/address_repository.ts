import { AddressByPostalCodeMapper } from '../../models/address/mappers/address_by_postal_code_mapper';
import { HttpErrorHandler } from '@infra/repositories/shared/errors/http_error_handler';
import { AddressEntity } from '@domain/entities/address/address_entity';
import { AddressRepositoryInterface } from "@domain/contracts/repositories";
import { AddressDatasourceInterface } from '@infra/contracts/datasources';

export class AddressRepository implements AddressRepositoryInterface {

  constructor(
    private readonly datasource: AddressDatasourceInterface,
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
