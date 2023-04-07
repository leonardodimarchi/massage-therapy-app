import { AddressEntity } from '../../entities/address/address_entity';

export abstract class AddressRepositoryInterface {
  abstract getAddressByPostalCode(postalCode: string): Promise<AddressEntity>;
}



