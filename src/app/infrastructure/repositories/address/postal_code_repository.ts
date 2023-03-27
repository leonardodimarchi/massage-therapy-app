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
      return await this.datasource.getAddressByPostalCode(postalCode);
    } catch(error) {
      HttpErrorHandler.handle(error);
    }
  }
}
