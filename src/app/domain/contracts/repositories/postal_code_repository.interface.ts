import { AddressEntity } from './../../entities/address/address_entity';

export abstract class PostalCodeRepositoryInterface {
  abstract getAddressByPostalCode(postalCode: string): Promise<AddressEntity>;
}



