import { AddressEntity } from '@domain/entities/address/address_entity';

export abstract class PostalCodeDatasourceInterface {
  abstract getAddressByPostalCode(postalCode: string): Promise<AddressEntity>;
}
